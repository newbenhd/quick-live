const model = require("./user.model");
const _ = require("lodash");

const signup = async (req, res) => {
  try {
    const user = await model.create(req.body);
    const token = await user.generateAuthToken();
    res.status(201).send({
      user,
      message: "Sign up success.",
      token
    });
  } catch (error) {
    res.status(500).send({
      error,
      message: "Fail to sign up. Please try again."
    });
  }
};
const signIn = async (req, res) => {
  try {
    const user = await model.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({
      message: "Sign in success.",
      token
    });
  } catch (error) {
    res.status(500).send({
      error,
      message: "Fail to sign in. Please try again."
    });
  }
};
const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token != req.token);
    await req.user.save();
    res.status(202).send({
      message: "Successfully logged out."
    });
  } catch (error) {
    res.status(500).send({
      error,
      message: "Fail to log out. Please try again."
    });
  }
};
const deleteOne = async (req, res) => {
  try {
    await req.user.remove();
    res.status(202).send({
      message: "Delete your account success."
    });
  } catch (error) {
    res.status(500).send({
      error,
      message: "Fail to delete your account. Please try again."
    });
  }
};
const updateOne = async (req, res) => {
  const schemeKeys = Object.keys(model.schema.path);
  // const updateKeys = Object.keys(req.body)
  const updates = _.pick(req.body, schemeKeys);
  if (_.isEmpty(updates)) {
    res.status(400).send({
      error: "At least one of update keys has to match to user keys.",
      message: "At least one of update keys has to match to user keys."
    });
  }
  try {
    for (let key in updates) {
      req.user[key] = updates[key];
    }
    await req.user.save();
    res.status(201).send({
      message: "Update your account success."
    });
  } catch (error) {
    res.status(500).send({
      error,
      message: "Fail to update your account. Please try again."
    });
  }
};
const getOne = async (req, res) => {
  res.status(200).send(req.user);
};

module.exports = {
  signup,
  signIn,
  logout,
  deleteOne,
  updateOne,
  getOne
};
