const callback = (req, res) => {
  res.status(200).redirect("/");
};
const logout = (req, res) => {
  req.logout();
  res.status(202).redirect("/");
};

module.exports = {
  callback,
  logout
};
