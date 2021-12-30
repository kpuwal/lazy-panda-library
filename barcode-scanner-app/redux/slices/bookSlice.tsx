import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APP_ENV_IP, APP_ENV_ADDRESS } from '@env';

const initialState = {
  title: '',
  subtitle: '',
  authors: [],
  pageCount: 0,
  publishedDate: '',
  language: '',
  isLoaded: false,
  bookError: '',
};

const fetchData = async (url: string, isbn: string) => {
  const config = {
    method: 'POST',
    body: JSON.stringify({isbn}),
    headers: { 
      'Content-Type': 'application/json',
    }
  }  
  
  try {
    const data = await fetch(url, config);
    return data.json();
  } catch(err) {
    return err
  }
}

export const fetchBook = createAsyncThunk(
  'sources',
  async (isbn: string) => {
    return fetchData(`${APP_ENV_ADDRESS}/api/book`, isbn);
  }
)

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.totalItems !== 0) {
        const data = action.payload.items[0].volumeInfo;
        state.title = data.title;
        state.subtitle = data.subtitle === undefined ? "" : data.subtitle;
        state.authors = data.authors;
        state.pageCount = data.pageCount;
        state.publishedDate = data.publishedDate;
        state.language = data.language;
        state.isLoaded = true;
      } else {
        state.bookError = "Panda is sad. The book was not found in the GoogleBooks database";
      }
    })
    .addCase(fetchBook.rejected, (state, action) => {
      state.bookError = "Server is not connected";
    })
  },
})

export default bookSlice.reducer;
