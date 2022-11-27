const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  authorId: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
    enum: ["organization", "user"],
  },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  images: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Image",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
