import { createSlice } from "@reduxjs/toolkit";

type appTypes = {
  scanned: boolean,
  disabled: boolean,
  flashMode: string,
}

const initialState: appTypes = {
  scanned: false,
  disabled: true,
  flashMode: 'off',
};

const appSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    isScanned: (state, action) => {
      state.scanned = action.payload; 
    },
    isDisabled: (state, action) => {
      state.disabled = action.payload;
    },
    setFlashMode: (state, action) => {
      state.flashMode = action.payload;
    }
  },
})

export const { isScanned, isDisabled, setFlashMode } = appSlice.actions;
export default appSlice.reducer;
