import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import searchReducer from './reducers/searchReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
