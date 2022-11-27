const mongoose = require("mongoose");

const checkId = (objectId) => {
  return mongoose.isValidObjectId(objectId);
};

module.exports = checkId;
