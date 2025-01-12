import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ConfirmClearState {
  open: boolean;
}

// Define the initial state using that type
const initialState: ConfirmClearState = {
  open: false,
};

export const confirmClearSlice = createSlice({
  name: 'confirmClear',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setConfirmClearOpen: (state) => {
      state.open = true;
    },
    setConfirmClearClosed: (state) => {
      state.open = false;
    },
  },
});

export const { setConfirmClearOpen, setConfirmClearClosed } = confirmClearSlice.actions;

export default confirmClearSlice.reducer;
