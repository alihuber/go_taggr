import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { toast } from 'react-toastify';

const notifyInfo = (message: string) => {
  toast.info(message, {
    position: 'bottom-center',
  });
};

const notifyError = (message: string) => {
  toast.info(message, {
    position: 'bottom-center',
  });
};

// Define a type for the slice state
interface MessageState {
  value: string;
}

// Define the initial state using that type
const initialState: MessageState = {
  value: '',
};

type MessagePayload = {
  message: string;
  severity: string;
};

export const messageSlice = createSlice({
  name: 'message',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setMessage: (state, action: PayloadAction<MessagePayload>) => {
      state.value = action.payload.message;
      switch (action.payload.severity) {
        case 'error':
          notifyError(action.payload.message);
          return;
        default:
          notifyInfo(action.payload.message);
          break;
      }
    },
  },
});

export const { setMessage } = messageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMessage = (state: RootState) => state.message;

export default messageSlice.reducer;
