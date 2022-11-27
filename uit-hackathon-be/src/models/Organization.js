const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  avatarUrl: {
    type: String,
    require: true,
  },
  coverUrl: {
    type: String,
    require: true,
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  events: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Event",
  },
});

module.exports = mongoose.model("Organization", organizationSchema);
