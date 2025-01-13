import { configureStore } from '@reduxjs/toolkit';

import messageReducer from './features/messageSlice';
import metadataReducer from './features/metadataSlice';
import confirmClearReducer from './features/confirmClearSlice';
import filenameCopyReducer from './features/filenameCopySlice';
import numberingReducer from './features/numberingSlice';

const store = configureStore({
  reducer: {
    // Define a top-level state fields
    message: messageReducer,
    metadata: metadataReducer,
    confirmClearDialog: confirmClearReducer,
    filenameCopyDialog: filenameCopyReducer,
    numberingDialog: numberingReducer,
  },
});

export default store;

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
