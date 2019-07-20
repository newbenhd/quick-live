const mongoose = require("mongoose");

const testDB = {
  open: () =>
    new Promise((resolve, reject) => {
      mongoose
        .connect("mongodb://127.0.0.1:27018/test-quick-live", {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false
        })
        .then(() => resolve())
        .catch(e => reject(e));
    }),
  drop: () => mongoose.connection.dropDatabase(),
  close: () => mongoose.disconnect()
};
const prodDB = {
  open: () =>
    new Promise((resolve, reject) => {
      mongoose
        .connect("mongodb://127.0.0.1:27018/prod-quick-live", {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: true
        })
        .then(() => resolve())
        .catch(e => reject(e));
    }),
  close: () => mongoose.disconnect()
};

const mode = process.env.NODE_ENV || "test";

module.exports = mode === "test" ? testDB : prodDB;
