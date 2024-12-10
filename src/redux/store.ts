// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import ambulanceReducer from './features/ambulanceSlice';

export const store = configureStore({
  reducer: {
    ambulance: ambulanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;