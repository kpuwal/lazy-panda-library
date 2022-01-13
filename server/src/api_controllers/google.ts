require('dotenv').config();
import { Request, Response } from 'express';
import { cleanData } from './helper';

const axios = require('axios').default;
const url = process.env.GOOGLE_BOOKS_URL;

export const googleRequest = async (request: Request, response: Response): Promise<void> => {
  const isbn = request.body.isbn;
  axios.get(url + isbn)
    .then(function (resp: any) {
      const cleanedData = cleanData(resp.data);
      return response.status(200).send(cleanedData);
    })
    .catch(function (error: Error) {
      return response.send(error);
    })
}