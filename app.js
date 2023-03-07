const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/mestodb');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64074d530890d752732db1f6',
  };

  next();
});

app.use('/', userRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
