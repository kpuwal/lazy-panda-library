## Lazy Panda Library Project
Book Library in Google Spreadsheets.

Simple React Native app that helps creating a home book library by scanning ISBN barcode, retriving information about a book from an API and saving it into a Google Spreadsheet file.  

![Employee data](/images/mockup.jpg?raw=true "mockup1")

## Concept

1. Scan ISBN: 
    
    mobile -> Server -> GoogleBooksAPI -> Server -> mobile (edit info)
2. Save a book: 

    mobile -> Server -> GoogleSpreadsheetAPI

![Employee data](/images/image.png?raw=true "concept")

## Stack
1. Expo + React Native + Redux + Typescript
2. Express server on Heroku