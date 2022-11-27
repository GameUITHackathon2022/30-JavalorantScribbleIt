const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
    enum: ["avatar", "cover", "event", "comment"],
  },
  imageExtension: {
    type: String,
    require: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Image", imageSchema);
