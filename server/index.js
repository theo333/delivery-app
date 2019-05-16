const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
