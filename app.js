const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { middlewaresError } = require('./middlewares/middlewaresError');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1/mestodb');

const app = express();

app.use(express.json());

app.use(router);
app.use(errors());
app.use(middlewaresError);

app.listen(PORT);
