const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();

const contactsRouter = require('./routes/api/contacts/contacts');
const authRouter = require('./routes/api/auth/auth');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';



app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // avatars

app.use('/', contactsRouter);
app.use('/:id', contactsRouter);
app.use('/users', authRouter);

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
});

app.use((err, req, res, next) => {
  const code = err.status || 500;
  const status = err.status ? 'error' : 'fail';
  res.status(code).json({ status, code, message: err.message })
});

module.exports = app;
