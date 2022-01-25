## Lazy Panda Library Project
Book Library in Google Spreadsheets.

Simple React Native app that helps creating a home book library by scanning ISBN barcode, retriving information about a book from an API and saving it into a Google Spreadsheet file.  

![Employee data](/images/mockup.jpg?raw=true "mockup1")

## Concept

The need for the app was born when I moved in with my partner and wanted to create a list of books in our newly joined library.
I wanted to get an information about the book by scanning its ISBN code, be able to edit it and perhaps add some more information and then save it into a Spreadsheet file on my GoogleDrive. It turned out to be a fun and sucessful project we both enjoy :) 

1. Scan ISBN: 
    
    mobile -> Server -> GoogleBooksAPI -> Server -> mobile (edit info)
2. Save a book: 

    mobile -> Server -> GoogleSpreadsheetAPI

![Employee data](/images/image.png?raw=true "concept")

## Stack
1. Expo + React Native + Redux + Typescript
2. Express server on Heroku