const Router = require('express-promise-router');
const { googleRequest } = require('./src/api_controllers/google');
const {
  writeLibrary,
  readLibrary,
  readPicker
} = require('./src/api_controllers/sheets');

const router = new Router();

router.post('/api/book', googleRequest);
router.post('/api/add-book', writeLibrary);
router.get('/api/library', readLibrary);
router.get('/api/picker', readPicker);

module.exports = router;
