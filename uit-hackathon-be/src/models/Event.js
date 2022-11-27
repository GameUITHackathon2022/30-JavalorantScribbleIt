const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  maxJoin: {
    type: Number,
    require: true,
  },
  time: {
    type: Date,
    require: true,
    default: Date.now,
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  country: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  district: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    require: true,
  },
});

eventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Event", eventSchema);
