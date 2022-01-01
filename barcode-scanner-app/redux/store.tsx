import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './slices/bookSlice';

import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    book: bookReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;