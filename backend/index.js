require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const { auth } = require('./middlewares/auth');
const routerAuth = require('./routes/auth');
const NotFound = require('./errors/NotFound');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/corsHandler');

const { PORT = 3000, MONGO_DB = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(corsHandler);
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', routerAuth);

app.use(auth);

app.use(routerUsers);
app.use(routerCards);

app.use('*', (req, res, next) => next(new NotFound('Неправильный путь')));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
