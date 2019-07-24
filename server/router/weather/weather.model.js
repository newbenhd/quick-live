const mongoose = require("mongoose");
const validator = require("validator");

const score = new mongoose.Schema({
  name: {
    type: "String",
    validate: value => {}
  }
});
