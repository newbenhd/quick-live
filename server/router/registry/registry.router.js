const router = require('express').Router();
const depn = require('depn');

router.route('/').get(async (req, res)=>{
  // for now
  const name = req.query.name;
  const version = req.query.version === 'undefined' ? undefined : req.query.version;
  if(version) {
    const data = await depn.getRegistry(name, version);
    return res.send(data);
  } else {
    const data = await depn.getRegistryInfo(name);
    return res.send(data);
  }
});
router.route('/full').get(async (req, res)=>{
  const name = req.query.name;
  const version = req.query.version;
  const data = await depn.getDepn(name, version);
  res.send(data);
});

module.exports = router;