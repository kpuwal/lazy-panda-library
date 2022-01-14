## Lazy Panda Library Project

### Screenshots
![Employee data](/images/mockup01.jpg?raw=true "mockup1")
![Employee data](/images/mockup02.jpg??raw=true "mockup2")
![Employee data](/images/mockup03.jpg??raw=true "mockup3")

### Why
React Native mobile application that access book's ISBN barcode information and after manual revaluation saves it to Google Spreadsheet file. It's a tool for Home library archive creation.

### Concept
![Employee data](/images/image.png?raw=true "concept")

1. Scan ISBN: mobile -> Server -> GoogleBooksAPI -> Server -> mobile (edit info)
2. Save a book: mobile -> Server -> GoogleSpreadsheetAPI

### Stack
1. Expo/React Native
2. Express server on Heroku