## Lazy Panda Library Project
Home Library in Google Spreadsheets. 

### Screenshots
![Employee data](/images/mockup.jpg?raw=true "mockup1")

### Why
React Native mobile application that access book's ISBN barcode information and after manual revaluation saves it to Google Spreadsheets file.

### Concept
![Employee data](/images/image.png?raw=true "concept")

1. Scan ISBN: mobile -> Server -> GoogleBooksAPI -> Server -> mobile (edit info)
2. Save a book: mobile -> Server -> GoogleSpreadsheetAPI

### Stack
1. Expo + React Native + Redux + Typescript
2. Express server on Heroku