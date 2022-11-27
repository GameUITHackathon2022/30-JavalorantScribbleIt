const mongoose = require("mongoose");

const logger = require("../utils/logger");

// Log error and exit app if mongodb connection fail
const exitProcessWhenError = (error) => {
  logger.error(`Connection error: ${error}`, { label: "mongoose" });

  // Stop process without app crash
  process.exitCode = 1;
};

const connect = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .once("open", () => logger.info("MongoDB connected"))
    .on("error", (err) => exitProcessWhenError(err));
};

module.exports = { connect };
