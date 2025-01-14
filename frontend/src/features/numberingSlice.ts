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
    setNumberingDialogOpen: (state) => {
      state.open = true;
    },
    setNumberingDialogClosed: (state) => {
      state.open = false;
    },
    setStoreLeadingZeros: (state, action: PayloadAction<boolean>) => {
      state.storeLeadingZeros = action.payload;
    },
    setStoreTrackCount: (state, action: PayloadAction<boolean>) => {
      state.storeTrackCount = action.payload;
    },
  },
});

export const { setNumberingDialogClosed, setNumberingDialogOpen, setStoreLeadingZeros, setStoreTrackCount } = numberingSlice.actions;

export default numberingSlice.reducer;
