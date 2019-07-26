const User = require("./oauth.model");
const express = require("express");
const router = express.Router();
const controller = require("./oauth.controller");
const config = require("./config");
const GitHubStrategy = require("passport-github").Strategy;

const passport = require("passport");

passport.use(
  new GitHubStrategy(
    {
      clientID: config.gitClientID,
      clientSecret: config.gitClientSecret,
      callbackURL: "/api/oauth/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log('oauth github');
      try {
        let user = await User.findOne({
          id: profile._json.id
        });
        if (user) {
          console.log("found the user from db");
          return cb(null, user);
        }
        user = await User.create({
          id: profile._json.id,
          username: profile.username,
          displayName: profile.displayName,
          email: profile._json.email
        });
        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serialize user");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserialize user");
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

router.route("/signIn").get(passport.authenticate("github"));
router
  .route("/callback")
  .get(
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/");
    }
  );
router.route('/signOut').post(controller.logout);

module.exports = router;
