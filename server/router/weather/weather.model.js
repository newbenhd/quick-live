const mongoose = require("mongoose");
const validator = require("validator");

const weather = new mongoose.Schema({
  name: {
    type: "String",
    validate: value => {}
  }
});
