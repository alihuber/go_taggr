import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface FilenameCopyState {
  open: boolean;
  regex: string;
}

// Define the initial state using that type
const initialState: FilenameCopyState = {
  open: false,
  regex: '\\d\\d - (.*).mp3',
};

export const filenameCopySlice = createSlice({
  name: 'filenameCopy',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
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

export const { setFilenameCopyDialogClosed, setFilenameCopyDialogOpen, setFilenameCopyRegex } = filenameCopySlice.actions;

export default filenameCopySlice.reducer;
