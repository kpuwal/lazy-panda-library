## Lazy Panda Library Project
Home Book Library in Google Spreadsheets. 

![Employee data](/images/mockup.jpg?raw=true "mockup1")

### Why
React Native mobile application that access book's ISBN barcode information and after manual review saves it to Google Spreadsheets file.

### Concept
![Employee data](/images/image.png?raw=true "concept")

1. Scan ISBN: mobile -> Server -> GoogleBooksAPI -> Server -> mobile (edit info)
2. Save a book: mobile -> Server -> GoogleSpreadsheetAPI

### Stack
1. Expo + React Native + Redux + Typescript
2. Express server on Heroku