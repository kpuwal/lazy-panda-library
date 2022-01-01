"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importStar(require("express"));
require("colors");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const { google } = require('googleapis');
const axios = require('axios').default;
const url = process.env.GOOGLE_BOOKS_URL;
const id = process.env.GOOGLE_API_SHEET_ID;
const id2 = process.env.GOOGLE_API_PICKER_SHEET_ID;
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const authentication = () => __awaiter(void 0, void 0, void 0, function* () {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: process.env.GOOGLE_API_SCOPES,
    });
    const client = yield auth.getClient();
    const sheets = google.sheets({
        version: 'v4',
        auth: client,
    });
    return { sheets };
});
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "development";
app.get("/", (_req, res) => {
    return res.send("App is Running...");
});
const cleanData = (data) => {
    if (data.totalItems !== 0) {
        const bookInfo = data.items[0].volumeInfo;
        const bookSubtitle = bookInfo.subtitle === undefined ? "" : bookInfo.subtitle;
        return {
            isFound: true,
            title: bookInfo.title + '. ' + bookSubtitle,
            author: bookInfo.authors.join(', '),
            language: bookInfo.language,
            publishedDate: bookInfo.publishedDate,
            pageCount: bookInfo.pageCount,
        };
    }
    else {
        return { isFound: false };
    }
};
app.post('/api/book', (_req, res) => {
    const isbn = _req.body.isbn;
    axios.get(url + isbn)
        .then(function (resp) {
        const cleanedData = cleanData(resp.data);
        return res.status(200).send(cleanedData);
    })
        .catch(function (error) {
        return res.send(error);
    });
});
app.get('/api/library', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sheets } = yield authentication();
        const response = yield sheets.spreadsheets.values.get({
            spreadsheetId: id,
            range: 'Sheet1',
        });
        res.send(response.data);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.get('/api/picker', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sheets } = yield authentication();
        const response = yield sheets.spreadsheets.values.get({
            spreadsheetId: id2,
            range: 'Sheet1',
            majorDimension: 'COLUMNS'
        });
        res.send(response.data);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.post('/api/add-book', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("about to save!");
    try {
        const { title, author, language, publishedDate, pageCount, genre, series, world, readBy, } = _req.body;
        console.log("title ", _req.body);
        const { sheets } = yield authentication();
        const writeReq = yield sheets.spreadsheets.values.append({
            spreadsheetId: id,
            range: 'Sheet1',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            // shiftDimension: 'ROWS',
            resource: {
                values: [
                    [title, author, language, publishedDate, pageCount, genre, series, world, readBy]
                ]
            }
        });
        if (writeReq.status === 200) {
            console.log('Spreadsheet updated successfully!');
            return res.json({ msg: 'Spreadsheet updated successfully!' });
        }
        return res.json({ msg: 'Something went wrong while updating the spreadsheet' });
    }
    catch (err) {
        console.log('ERROR UPDATING THE SHEET', err);
        res.send(err);
    }
}));
app.listen(PORT, () => console.log(` 📡 Backend server: ` +
    ` Running in ${ENV} mode on port ${PORT}`));
