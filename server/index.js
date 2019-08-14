const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.get('/app.js', (req, res, next) => res.sendFile(path.join(__dirname, '../public', 'main.js')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '../public', 'index.html')));

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`app listening on port ${PORT}`);
});
