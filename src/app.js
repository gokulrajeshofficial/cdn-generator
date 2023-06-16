const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const indexRouter = require('./routers/index');

app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})