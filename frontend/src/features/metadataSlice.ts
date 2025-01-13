import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { toast } from 'react-toastify';
import { EMPTY_METADATA } from '../constants';

const notifyError = (message: string) => {
  toast.error(message, {
    position: 'bottom-center',
  });
};

const notifySuccess = (message: string) => {
  toast.info(message, {
    position: 'bottom-center',
  });
};

export interface Metadata {
  index: number;
  album: string;
  albumArtist: string;
  artist: string;
  comment: string;
  cover: string;
  fileName: string;
  genre: string;
  selected: boolean;
  title: string;
  track: string;
  year: string;
}

// Define a type for the slice state
interface MetadataState {
  value: Metadata[];
  selectedMetadata: Metadata;
}

// Define the initial state using that type
const initialState: MetadataState = {
  value: [],
  selectedMetadata: {
    album: '',
    albumArtist: '',
    artist: '',
    comment: '',
    cover: '',
    fileName: '',
    genre: '',
    index: 0,
    selected: false,
    title: '',
    track: '',
    year: '',
  },
};

type InputUpdateAction = {
  inputType: string;
  newValue: string;
};

type SetNumberingAction = {
  storeLeadingZeros: boolean;
  storeTrackCount: boolean;
};

export const metadataSlice = createSlice({
  name: 'metadata',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLoadedMetadata: (state, action: PayloadAction<Metadata[]>) => {
      if (!action.payload || action.payload.length === 0) {
        notifyError('No files selected!');
      } else {
        notifySuccess(`${action.payload.length} file(s) loaded!`);
      }
      state.value = action.payload || [];
    },
    setMetadata: (state, action: PayloadAction<Metadata[]>) => {
      state.value = action.payload || [];
    },
    clearMetadata: (state) => {
      notifySuccess('Data cleared!');
      state.value = [];
    },
    setSelectedMetadata: (state, action: PayloadAction<Metadata>) => {
      state.value[action.payload.index] = action.payload;
      const currentlySelected = state.value.find((data) => data.selected);
      if (!currentlySelected || action.payload.fileName.length === 0) {
        state.selectedMetadata = EMPTY_METADATA;
      } else {
        state.selectedMetadata = currentlySelected;
      }
    },
    updateAttributeByType: (state, action: PayloadAction<InputUpdateAction>) => {
      state.value
        .filter((value) => value.selected)
        .forEach((metadata) => {
          const metadataObject = metadata as unknown as Record<string, string>;
          metadataObject[action.payload.inputType] = action.payload.newValue;
        });
      const selectedMetadataObject = state.selectedMetadata as unknown as Record<string, string>;
      selectedMetadataObject[action.payload.inputType] = action.payload.newValue;
    },
    setTitlesFromFilename: (state, action: PayloadAction<string>) => {
      state.value.forEach((metadata) => {
        const filePath = metadata.fileName || '';
        const extractedFilename = filePath.slice(filePath.lastIndexOf('/') + 1, filePath.length);
        const foundFileName = extractedFilename.match(action.payload || '') || '';
        if (foundFileName?.length !== 0) {
          metadata.title = foundFileName[1].trim();
        }
      });
      notifySuccess('Titles changed!');
    },
    setTracksFromNumbering: (state, action: PayloadAction<SetNumberingAction>) => {
      state.value.forEach((data, idx) => {
        let trackNum = String(idx + 1);
        let trackCount = String(state.value.length);
        let maxLength = String(state.value.length).length;
        if (maxLength === 1) {
          maxLength = 2;
        }
        const storeZeros = action.payload.storeLeadingZeros;
        const storeTracks = action.payload.storeTrackCount;
        if (storeZeros && storeTracks) {
          trackNum = trackNum.padStart(maxLength, '0');
          if (state.value.length < 10) {
            trackCount = trackCount.padStart(2, '0');
          }
          data.track = `${trackNum}/${trackCount}`;
        }
        if (storeZeros && !storeTracks) {
          trackNum = trackNum.padStart(maxLength, '0');
          data.track = trackNum;
        }
        if (!storeZeros && storeTracks) {
          data.track = `${trackNum}/${trackCount}`;
        }
        if (!storeZeros && !storeTracks) {
          data.track = trackNum;
        }
      });
      notifySuccess('Numbering changed!');
    },
  },
});

export const {
  setMetadata,
  setLoadedMetadata,
  clearMetadata,
  setSelectedMetadata,
  updateAttributeByType,
  setTitlesFromFilename,
  setTracksFromNumbering,
} = metadataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMetadata = (state: RootState) => state.metadata.value;
export const selectedMetadata = (state: RootState) => state.metadata.selectedMetadata;

export default metadataSlice.reducer;
