import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APP_ENV_IP, APP_ENV_ADDRESS } from '@env';
import { isLocal } from '../../config';

type bookType = {
  title: string,
  author: string,
  language: string,
  publishedDate: string,
  pageCount: string | number,
  genre: string,
  series: string,
  world: string,
  readBy: string,
  boughtGivenOn: string,
  givenBy: string,
  lastReadByJowie: string,
  lastReadByKasia: string,
}

const initialState = {
  title: '',
  subtitle: '',
  author: '',
  language: '',
  publishedDate: '',
  pageCount: 0,
  genre: '',
  series: '',
  world: '',
  readBy: '',
  boughtGivenOn: '',
  givenBy: '',
  lastReadByJowie: '',
  lastReadByKasia: '',
  isFound: true,
  isLoaded: false,
  bookError: '',
};

export const fetchBook = createAsyncThunk(
  '/api/book',
  async (isbn: string) => {
    const config = {
      method: 'POST',
      body: JSON.stringify({isbn}),
      headers: { 
        'Content-Type': 'application/json',
      }
    }  
    
    try {
      const data = await fetch(
        `${isLocal ? APP_ENV_IP : APP_ENV_ADDRESS}/api/book`,
        config
      );
      return data.json();
    } catch(err) {
      return {bookError: err};
    }
  }
)

export const saveBook = createAsyncThunk(
  '/api/add-book',
  async (book: bookType) => {
    const config = {
      method: 'POST',
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        language: book.language,
        publishedDate: book.publishedDate,
        pageCount: book.pageCount,
        genre: book.genre,
        series: book.series,
        world: book.world,
        readBy: book.readBy,
        boughtGivenOn: book.boughtGivenOn,
        givenBy: book.givenBy,
        lastReadByJowie: book.lastReadByJowie,
        lastReadByKasia: book.lastReadByKasia,
      }),
      headers: { 
        'Content-Type': 'application/json',
      }
    }
    try {
      await fetch(`${isLocal ? APP_ENV_IP : APP_ENV_ADDRESS}/api/add-book`, config);
    } catch (err) {
      return { bookError: err}
    }
    
  }
)

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    updateBook: (state, action) => {
    Object.assign(state, action.payload);
    },
    cleanBook: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.isFound) {
        const data = action.payload;
        state.title = data.title;
        state.author = data.author;
        state.pageCount = data.pageCount;
        state.publishedDate = data.publishedDate;
        state.language = data.language.toUpperCase();
        state.isLoaded = true;
      } else {
        state.bookError = "Book has not been found in the database";
      }
    })
    .addCase(fetchBook.rejected, (state, action) => {
      console.log('fetch book error')
      state.bookError = "Server is not connected";
    })
    .addCase(saveBook.rejected, (state, action) => {
      state.bookError = "Error saving the book";
    })
  },
})

export const { updateBook, cleanBook } = bookSlice.actions;
export default bookSlice.reducer;
