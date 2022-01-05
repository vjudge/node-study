const colors = require('colors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const timeout = require('connect-timeout')

morgan.format('log', `[:date[iso]] :method :url :status :response-time ms - :res[content-length] - [:remote-addr]`);

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(cookieParser());

app.use(timeout('180s'));
app.use(require('compression')());
app.use(require('response-time')());

app.use(require('./routers/health'));
require('./routers/v1')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
});

// error handlers
// development error handler will print stacktrace
// production error handler no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.error('Error Handlers: ', err, err.stack)
    res.status(err.status || 500).json({
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    })
});

app.on('uncaughtException', (err) => {
    console.error(colors.red(err.stack));
    process.exit(2);
});

module.exports = app;