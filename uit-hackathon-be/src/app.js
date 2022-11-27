require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const router = require("./routes/");
const logger = require("./utils/logger");
const mongoDB = require("./utils/mongodb");
const passport = require("./utils/passport");

const PORT = process.env.PORT || 5000;
const app = express();

mongoDB.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny", { stream: logger.stream }));
app.use(passport.initialize());

router.route(app);

app.listen(PORT, () => {
  logger.info(`App listening: http://localhost:${PORT}`);
});
