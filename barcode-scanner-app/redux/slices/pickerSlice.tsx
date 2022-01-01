
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICountries } from '../types';

interface IactiveSlice {
  mood: number,
  country: {iso: string, label: string},
  title: string,
  main: boolean,
}

const initialState: IactiveSlice = {
  mood: 0,
  country: { iso: "", label: "" },
  title: "",
  main: true,
}

export const activeSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    activateMood: (state, action: PayloadAction<number>) => {
      state.mood = action.payload
    },
    activateCountry: (state, action: PayloadAction<ICountries>) => {
      state.country = action.payload
    },
    activateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    activateMain: (state, action: PayloadAction<boolean>) => {
      state.main = action.payload
    },
  },
})

export const { activateMood, activateCountry, activateTitle, activateMain } = activeSlice.actions;
export default activeSlice.reducer;
