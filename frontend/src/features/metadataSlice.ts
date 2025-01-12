import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { toast } from 'react-toastify';

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

export const metadataSlice = createSlice({
  name: 'metadata',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLoadedMetadata: (state, action: PayloadAction<Metadata[]>) => {
      if (!action.payload || action.payload.length === 0) {
        notifyError('No files selected!');
      }
      state.value = action.payload || [];
      notifySuccess(`${state.value.length} file(s) loaded!`);
    },
    setMetadata: (state, action: PayloadAction<Metadata[]>) => {
      state.value = action.payload || [];
    },
    clearMetadata: (state) => {
      notifySuccess('Data cleared!');
      state.value = [];
    },
    setSelectedMetadata: (state, action: PayloadAction<Metadata>) => {
      state.selectedMetadata = action.payload;
      state.value[action.payload.index] = action.payload;
    },
  },
});

export const { setMetadata, setLoadedMetadata, clearMetadata, setSelectedMetadata } = metadataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMetadata = (state: RootState) => state.metadata.value;
export const selectedMetadata = (state: RootState) => state.metadata.selectedMetadata;

export default metadataSlice.reducer;
