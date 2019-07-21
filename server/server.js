const express = require("express");
const morgan = require("morgan");
const userRouter = require("./router/user/user.router");

const app = express();

/* General purpose middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* Mount routers */
app.use("/api/user", userRouter);

module.exports = app;
