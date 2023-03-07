const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./routes/users');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
