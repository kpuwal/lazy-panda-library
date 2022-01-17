require('dotenv').config();
const { google } = require('googleapis');

import { Request, Response } from 'express';
import { cleanPickerData } from './helper';

const id = process.env.GOOGLE_API_SHEET_ID;
const id2 = process.env.GOOGLE_API_PICKER_SHEET_ID;


export const writeLibrary = async (_req: Request, res: Response) => {
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
      range: 'LibraryCatalogue',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [
          [ title, author, language, publishedDate, pageCount, genre, series, world, readBy ]
        ]
      }
    })

    if (writeReq.status === 200) {
      console.log("updated spreadsheet")
      return res.json({msg: 'Spreadsheet updated successfully!'})
    }
    return res.json({msg: 'Something went wrong while updating the spreadsheet'})
  } catch (err) {
    console.log('ERROR UPDATING THE SHEET');
    res.status(500).send();
  }
}

export const readLibrary = async (_req: Request, res: Response) => {
  try {
    const { sheets } = await authentication();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: 'LibraryCatalogue',
    })
    return res.send(response.data);
  } catch (err) {
    return res.status(500).send(err);
  }
}

export const readPicker = async (_req: Request, res: Response) => {
  try {
    const { sheets } = await authentication();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: id2,
      range: 'Output',
      majorDimension: 'COLUMNS'
    })
    const cleanedData = cleanPickerData(response.data);
    return res.send(cleanedData);
  } catch (err) {
    return res.status(500).send({msg: err});
  }
}

const authentication = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: './google-credentials.json',
    scopes: process.env.GOOGLE_API_SCOPES,
  })

  const client = await auth.getClient();
  const sheets = google.sheets({
    version: 'v4',
    auth: client,
  })
  return { sheets };
}