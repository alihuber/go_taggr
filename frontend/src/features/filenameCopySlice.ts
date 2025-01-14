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
    setFilenameCopyDialogOpen: (state) => {
      state.open = true;
    },
    setFilenameCopyDialogClosed: (state) => {
      state.open = false;
    },
    setFilenameCopyRegex: (state, action: PayloadAction<string>) => {
      state.regex = action.payload;
    },
  },
});

export const { setFilenameCopyDialogClosed, setFilenameCopyDialogOpen, setFilenameCopyRegex } =
  filenameCopySlice.actions;

export default filenameCopySlice.reducer;
