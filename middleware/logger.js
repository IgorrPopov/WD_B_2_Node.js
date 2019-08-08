const path = require('path');
const winston = require('winston');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');


const levelsByMethod = {
    GET: 'info',
    POST: 'debug',
    PUT: 'verbose',
    DELETE: 'error',
    PATCH: 'warn'
};


const winstonLogger = createLogger({
    level: 'silly',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console({ format: format.combine(format.colorize({ all: true })) }),
        new transports.DailyRotateFile({
            datePattern: 'YYYY-MM-DD HH',
            filename: path.join(__dirname, '/../logs', 'log-%DATE%.log')
        })
    ]
});


winston.addColors({
    info: 'blue',
    debug: 'green',
    verbose: 'black',
    error: 'red',
    warn: 'cyan',
});


const logger = (req, res, next) => {
    const method = req.method;
    winstonLogger.log(`${levelsByMethod[method]}`, `${method} method received`);
    next();
};


module.exports = logger;