require('dotenv').config();
import express, { Application, json, Request, Response } from "express";
import "colors";
import cors from "cors";
import { config } from "dotenv";

const { google }= require('googleapis');
const axios = require('axios').default;
const url = process.env.GOOGLE_BOOKS_URL;
const id = process.env.GOOGLE_API_SHEET_ID;
const id2 = process.env.GOOGLE_API_PICKER_SHEET_ID;

const app: Application = express();

config();

const authentication = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: process.env.GOOGLE_API_SCOPES,
  })

  const client = await auth.getClient();
  const sheets = google.sheets({
    version: 'v4',
    auth: client,
  })
  return {sheets};
}

app.use(cors());
app.use(json());

const PORT: string | number = process.env.PORT || 5000;
const ENV: string = process.env.NODE_ENV || "development";

app.get("/", (_req: Request, res: Response) => {
  return res.send("App is Running...");
});

const cleanData = (data: any) => {
  if (data.totalItems !== 0) {
    const bookInfo = data.items[0].volumeInfo;
    const bookSubtitle = bookInfo.subtitle === undefined ? "" : bookInfo.subtitle;
    const bookTitle = lowerCaseAllWordsExceptFirstLetters(bookInfo.title + '. ' + bookSubtitle);
    const bookAuthor = lowerCaseAllWordsExceptFirstLetters(bookInfo.authors.join(', '))
    return {
      isFound: true,
      title: bookTitle,
      author: bookAuthor,
      language: bookInfo.language,
      publishedDate: bookInfo.publishedDate,
      pageCount: bookInfo.pageCount,
    };
  } else {
    return { isFound: false };
  }
}

function lowerCaseAllWordsExceptFirstLetters(string: string) {
  return string.replace(/\S*/g, function (word) {
      return word.charAt(0) + word.slice(1).toLowerCase();
  });
}

app.post('/api/book',(_req: Request, res: Response) => {
  const isbn = _req.body.isbn;
  axios.get(url + isbn)
    .then(function (resp: any) {
      const cleanedData = cleanData(resp.data);
      return res.status(200).send(cleanedData);
    })
    .catch(function (error: Error) {
      return res.send(error);
    })
})

app.get('/api/library', async (_req: Request, res: Response) => {
  try {
    const { sheets } = await authentication();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: 'Sheet1',
    })
    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})

const createPickerCategory = (items: string[]) => {
  return items.map((el: string): {label: string, value: string} => 
    {
      return {label: el, value: el}
    }
  )
}

const cleanPickerData = (data: any) => {
  const shiftedValues = data.values.map((item: string[]) => {
    item.shift();
    return item;
  })
  const genre = createPickerCategory(shiftedValues[0]);
  const series = createPickerCategory(shiftedValues[1]);
  const world = createPickerCategory(shiftedValues[2]);
  const readBy = createPickerCategory(shiftedValues[3]);

  return {
    isFound: true,
    genre: genre,
    series: series,
    world: world,
    readBy: readBy,
  };
}

app.get('/api/picker', async (_req: Request, res: Response) => {
  try {
    const { sheets } = await authentication();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: id2,
      range: 'Sheet1',
      majorDimension: 'COLUMNS'
    })
    const cleanedData = cleanPickerData(response.data);
    res.send(cleanedData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})

app.post('/api/add-book', async (_req: Request, res: Response) => {
  console.log("about to save!")
  try {
    const {
      title,
      author,
      language,
      publishedDate,
      pageCount,
      genre,
      series,
      world,
      readBy,
    } = _req.body;

    const { sheets } = await authentication();
    const writeReq = await sheets.spreadsheets.values.append({
      spreadsheetId: id,
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      // shiftDimension: 'ROWS',
      resource: {
        values: [
          [ title, author, language, publishedDate, pageCount, genre, series, world, readBy ]
        ]
      }
    })
  
    if (writeReq.status === 200) {
      console.log('Spreadsheet updated successfully!')
      return res.json({msg: 'Spreadsheet updated successfully!'})
    }
    return res.json({msg: 'Something went wrong while updating the spreadsheet'})
  } catch (err) {
    console.log('ERROR UPDATING THE SHEET', err);
    res.send(err);
  }
})

app.listen(PORT, () =>
  console.log(
    ` 📡 Backend server: ` +
      ` Running in ${ENV} mode on port ${PORT}`
  )
);
