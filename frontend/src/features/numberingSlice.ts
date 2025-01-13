import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface NumberingState {
  open: boolean;
  storeLeadingZeros: boolean;
  storeTrackCount: boolean;
}

// Define the initial state using that type
const initialState: NumberingState = {
  open: false,
  storeLeadingZeros: true,
  storeTrackCount: true,
};

export const numberingSlice = createSlice({
  name: 'numbering',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
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
