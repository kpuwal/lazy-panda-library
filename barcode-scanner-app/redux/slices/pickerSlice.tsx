
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APP_ENV_IP, APP_ENV_ADDRESS } from '@env';
import { isLocal } from '../../../CONFIG';

type pickerTypes = {label: string, value: string};

type pickerDataTypes = {
  genre: pickerTypes[],
  series: pickerTypes[],
  world: pickerTypes[],
  readBy: pickerTypes[],
  pickerError: string,
}

const pickerDefault = [{label: '', value: ''}];

const initialState: pickerDataTypes = {
  genre: pickerDefault,
  series: pickerDefault,
  world: pickerDefault,
  readBy: pickerDefault,
  pickerError: '',
}

export const fetchPicker = createAsyncThunk(
  '/api/picker',
  async () => {
    try {
      const data = await fetch(`${isLocal ? APP_ENV_IP : APP_ENV_ADDRESS}/api/picker`);
    return data.json();
    } catch(err) {
      return {pickerError: "Server is not connected"};
    }
  }
)

export const pickerSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchPicker.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    })
    .addCase(fetchPicker.rejected, (state, action) => {
      state.pickerError = "Server is not connected";
    })
  },
})

export default pickerSlice.reducer;
