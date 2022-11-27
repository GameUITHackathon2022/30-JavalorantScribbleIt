const path = require("path");
const winston = require("winston");

const { createLogger, format, transports } = winston;

const customFormat = format.printf(
  ({ level, message, label = "server", timestamp }) =>
    `${timestamp} | ${level.padEnd(5)} - [${label}] : "${message}"`
);

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),

    // Allows for logging Error instances
    // Ex: logger.warn(new Error('Error passed as info'));
    format.errors({ stack: true }),

    // Allows for string interpolation
    // Ex: logger.info('Found %s at %s', 'error', new Date());
    format.splat(),

    // Allows for JSON logging
    // Ex: logger.log({ level: 'info', message: 'Pass an object' });
    format.json(),

    customFormat
  ),
  transports: [
    // Write all logs with level `error` and below to `error.log`
    new transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
    }),

    // Write all logs with level `debug` and below to `debug.log`
    new transports.File({
      filename: path.join(__dirname, "../../logs/debug.log"),
    }),

    // Write to console
    new transports.Console({
      format: format.combine(format.colorize(), customFormat),
    }),
  ],
});

module.exports = logger;
module.exports.stream = {
  write: (message) => logger.http(message.replace(/\n$/, "")),
};
