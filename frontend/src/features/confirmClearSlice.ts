import { createSlice } from '@reduxjs/toolkit';

interface ConfirmClearState {
  open: boolean;
}

const initialState: ConfirmClearState = {
  open: false,
};

export const confirmClearSlice = createSlice({
  name: 'confirmClear',
  initialState,
  reducers: {
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
