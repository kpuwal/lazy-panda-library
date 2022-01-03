import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import bookReducer from './slices/bookSlice';
import pickerReducer from './slices/pickerSlice';
import appReducer from './slices/appSlice';

export const store = configureStore({
  reducer: {
    book: bookReducer,
    pickers: pickerReducer,
    app: appReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;