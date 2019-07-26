const express = require("express");
const router = express.Router();
const controller = require("./user.controller");
const protectMiddleware = require("../../middleware/auth");

router.route("/signUp").post(controller.signup);
router.route("/signIn").post(controller.signIn);
router.route("/logout").post(protectMiddleware, controller.logout);
router
  .route("/")
  .get(protectMiddleware, controller.getOne)
  .put(protectMiddleware, controller.updateOne)
  .delete(protectMiddleware, controller.deleteOne);

module.exports = router;
