const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
const passport = require("passport");
require("./libs/passport")

const dotenv = require('dotenv');
dotenv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');
const resumeRouter = require('./routes/resume.routes');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/resume', resumeRouter);

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.statusCode || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = app;
