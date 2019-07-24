const mongoose = require("mongoose");
const validator = require("validator");

const oauthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    displayName: {
      type: String
    },
    id: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: value => {
          validator.isEmail(value);
        },
        message: props => {
          return "must be email";
        }
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("OAuth", oauthSchema);
