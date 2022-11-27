const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  avatarUrl: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
    enum: ["pending", "user", "organization_member"],
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: function () {
      return this.role === "organization_member";
    },
  },
  followedOrganizations: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Organization",
  },
});

module.exports = mongoose.model("User", userSchema);
