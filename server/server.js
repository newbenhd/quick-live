const express = require("express");
// const session = require('express-session');
const morgan = require("morgan");
const passport = require("passport");
const cookieSession = require("cookie-session");
// const bodyParser = require('body-parser');
const userRouter = require("./router/user/user.router");
const oauthRouter = require("./router/oauth/oauth.router");
const path = require("path");

const app = express();

/* General purpose middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["skdlzl7017"]
  })
);
// app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..','client','build')));
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname,'../', 'client', 'build', 'index.html'));
  });
}

/* Mount routers */
app.use("/api/user", userRouter);
app.use("/api/oauth", oauthRouter);

module.exports = app;
