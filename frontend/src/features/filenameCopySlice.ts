import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilenameCopyState {
  open: boolean;
  regex: string;
}

const initialState: FilenameCopyState = {
  open: false,
  regex: '\\d\\d - (.*).mp3',
};

export const filenameCopySlice = createSlice({
  name: 'filenameCopy',
  initialState,
  reducers: {
    setFilenameCopyDialogOpenState: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setFilenameCopyRegex: (state, action: PayloadAction<string>) => {
      state.regex = action.payload;
    },
  },
});

export const { setFilenameCopyDialogOpenState, setFilenameCopyRegex } = filenameCopySlice.actions;

export default filenameCopySlice.reducer;
