const jwt = require("jsonwebtoken");
const model = require("../router/user/user.model");
const _ = require("lodash");

module.exports = async (req, res, next) => {
  // console.log(req.id);
  // console.log(req.session);
  if(req.user) {
    return next();
  }
  try {
    const token = req
      .header("Authorization")
      .replace("Bearer ", "")
      .trim();
    const decoded = await jwt.verify(token, "skdlzl7017");
    const user = await model.findById(decoded._id);
    if (!user) {
      return handleError({ name: "Unauthorized" }, res);
    }
    const index = _.findIndex(user.tokens, thisToken => {
      return thisToken.token === token;
    });
    if (index < 0) {
      return handleError({ name: "Unauthorized" }, res);
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    return handleError(error, res);
  }
};

const handleError = (error, res) => {
  if (error.name === "TokenExpiredError") {
    res.status(401).send({
      error,
      message: "Token expired. Please try again."
    });
  } else if (error.name === "JsonWebTokenError") {
    res.status(401).send({
      error,
      message: "Json web token failed. Please see details on error."
    });
  } else {
    res.status(401).send({
      error,
      message: "Unauthorized"
    });
  }
};
