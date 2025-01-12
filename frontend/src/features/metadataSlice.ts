import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { toast } from 'react-toastify';

const notifyError = (message: string) => {
  toast.error(message, {
    position: 'bottom-center',
  });
};

interface Metadata {}

// Define a type for the slice state
interface MetadataState {
  value: Metadata[];
}

// Define the initial state using that type
const initialState: MetadataState = {
  value: [],
};

export const metadataSlice = createSlice({
  name: 'metadata',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setMetadata: (state, action: PayloadAction<Metadata[]>) => {
      if (!action.payload || action.payload.length === 0) {
        notifyError(`No files Selected!`);
      }
      state.value = action.payload || [];
    },
  },
});

export const { setMetadata } = metadataSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMetadata = (state: RootState) => state.metadata;

export default metadataSlice.reducer;
