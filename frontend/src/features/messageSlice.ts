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

interface MessageState {
  value: string;
}

const initialState: MessageState = {
  value: '',
};

type MessagePayload = {
  message: string;
  severity: string;
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
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

export const selectMessage = (state: RootState) => state.message;

export default messageSlice.reducer;
