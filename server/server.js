const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const cookieSession = require("cookie-session");
const userRouter = require("./router/user/user.router");
const oauthRouter = require("./router/oauth/oauth.router");

const app = express();

/* General purpose middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: "skdlzl7017"
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));

/* Mount routers */
app.use("/api/user", userRouter);
app.use("/api/oauth", oauthRouter);

module.exports = app;
