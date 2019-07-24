const mongoose = require("mongoose");

const oauthSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    kakao: {
      type: Object
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("OAuth", oauthSchema);
