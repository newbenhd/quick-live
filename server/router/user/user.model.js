const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid email");
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 7
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

userSchema.statics.toJSON = function() {
  const obj = this.toObject();
  delete obj.tokens;
  delete obj.password;
  return obj;
};

userSchema.statics.generateAuthToken = async function() {
  try {
    const token = await jwt.sign({ _id: this._id.toString() }, "skdlzl7017", {
      expiresIn: "5h"
    });
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.findByCredentials = async function(email, password) {
  const model = mongoose.model("User", userSchema);
  const user = await model.findOne({
    email
  });
  if (!user) throw new Error("Login failed");
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword)
    return {
      error: new Error("Login failed"),
      message: "Login failed"
    };

  return user;
};

userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
userSchema.post("save", (err, doc, next) => {
  if (err.name === "MongoError" && err.code === 11000) {
    next({
      error: err,
      message: "There was a duplicate key error"
    });
  } else if (err.name === "ValidationError") {
    next({
      error: err,
      message: err._message
    });
  } else if (err.name === "CastError") {
    next({
      error: err,
      message: err.message
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
