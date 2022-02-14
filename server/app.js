var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const cors = require('cors')

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection OK")
}).catch((err) => {
    console.log(err)
})

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const verifyAccessToken = require('./routes/middleware/verifyAccessTokenMiddleware')
app.use('/users', usersRouter);
app.use('/', verifyAccessToken, indexRouter);

module.exports = app;