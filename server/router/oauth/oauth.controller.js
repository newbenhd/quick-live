const callback = (req, res) => {
  res.status(200).redirect("/");
};
const logout = (req, res) => {
  req.logout();
  console.log('logout!', req.user);
  res.status(202).redirect("/");
};

module.exports = {
  callback,
  logout
};
