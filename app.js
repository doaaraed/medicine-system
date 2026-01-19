const express = require('express');
const createError = require('http-errors');
require('dotenv').config();


const { returnJson } = require('./my_modules/json_response');
global.returnJson = returnJson;


const middleware = require('./middlewares');
const routes = require('./routes');


const app = express();


process.on('unhandledRejection', (reason) => {
process.exit(1);
});


middleware.global(app);

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use('/', routes);


app.use((req, res, next) => {
next(createError(404));
});


app.use((error, req, res, next) => {
console.log(error);
res.status(error.statusCode || 500).json({
status: {
status: false,
message: error.message
}
});
});


module.exports = app;