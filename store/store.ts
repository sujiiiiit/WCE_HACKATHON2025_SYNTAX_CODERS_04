import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './dialogSlice';
import locationReducer from './locationSlice';

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;