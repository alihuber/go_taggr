import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NumberingState {
  open: boolean;
  storeLeadingZeros: boolean;
  storeTrackCount: boolean;
}

const initialState: NumberingState = {
  open: false,
  storeLeadingZeros: true,
  storeTrackCount: true,
};

export const numberingSlice = createSlice({
  name: 'numbering',
  initialState,
  reducers: {
    setNumberingDialogOpenState: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setStoreLeadingZeros: (state, action: PayloadAction<boolean>) => {
      state.storeLeadingZeros = action.payload;
    },
    setStoreTrackCount: (state, action: PayloadAction<boolean>) => {
      state.storeTrackCount = action.payload;
    },
  },
});

export const { setNumberingDialogOpenState, setStoreLeadingZeros, setStoreTrackCount } = numberingSlice.actions;

export default numberingSlice.reducer;
