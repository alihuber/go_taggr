import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    setConfirmClearOpenState: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { setConfirmClearOpenState } = confirmClearSlice.actions;

export default confirmClearSlice.reducer;
