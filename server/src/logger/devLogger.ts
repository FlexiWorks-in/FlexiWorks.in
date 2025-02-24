import winston, { createLogger, format, Logger, transports } from 'winston';

const { combine, timestamp, printf } = format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  http: 'green',
  debug: 'white',
};

winston.addColors(colors);

const loggerFormat = printf((info) => {
  return `[${info.level}] ${info.timestamp}: ${info.message}`;
});

const devLogger = (): Logger => {
  return createLogger({
    level: 'debug',
    levels,
    format: combine(format.colorize(), timestamp(), loggerFormat),
    transports: [new transports.Console()],
  });
};

export default devLogger;
