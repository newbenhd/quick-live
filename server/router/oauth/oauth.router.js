const User = require("./oauth.model");
const express = require("express");
const router = express.Router();
const controller = require("./oauth.controller");

const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

passport.use(
  new KakaoStrategy(
    {
      clientID: "6277e4a1082f3d75f7b31b373a321b7e",
      callbackURL: "http://localhost:5000/api/oauth/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("passed!");
      let user = User.findOne({
        "kakao.id": profile.id
      })
        .then(user => {
          console.log("profile");
          if (!user) {
            console.log(profile._json);
            // user = await User.create({
            //   name: profile.username,
            //   email:
            //   kakao: profile._json
            // });
            return done(null, { name: profile.username });
          }
        })
        .catch(e => done(e, null));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

router
  .route("/signIn")
  .get(passport.authenticate("kakao", { scope: ["profile"] }), (req, res) => {
    console.log(req);
  });
router
  .route("/callback")
  .get(passport.authenticate("kakao"), controller.callback);
router.route("/logout").post(controller.logout);

module.exports = router;
