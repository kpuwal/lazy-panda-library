import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APP_ENV_IP, APP_ENV_ADDRESS } from '@env';

const isLocal = true;

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
      return err;
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
      }),
      headers: { 
        'Content-Type': 'application/json',
      }
    }

    await fetch(`${isLocal ? APP_ENV_IP : APP_ENV_ADDRESS}/api/add-book`, config)
  }
)

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    updateBook: (state, action) => {
    Object.assign(state, action.payload);
    },
    cleanBook: (state, action) => {
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
        state.language = data.language;
        state.isLoaded = true;
      } else {
        state.bookError = "Panda is sad. The book was not found in the GoogleBooks database";
      }
    })
    .addCase(fetchBook.rejected, (state, action) => {
      state.bookError = "Server is not connected";
    })
    .addCase(saveBook.rejected, (state, action) => {
      state.bookError = "Error saving the book";
    })
  },
})

export const { updateBook, cleanBook } = bookSlice.actions;
export default bookSlice.reducer;
