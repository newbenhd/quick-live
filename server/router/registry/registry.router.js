const router = require('express').Router();
const depn = require('depn');

router.route('/').get((req, res)=>{
  // for now
  const packageName = req.query.packageName;
  const version = req.query.version === 'undefined' ? undefined : req.query.version;
  depn(packageName, version, (err, res2)=>{
    if(err) {
      return res.send('error');
    } else {
      return res.send(res2.data);
    }
  })
});
router.route('/full').get((req, res)=>{
  const packageName = req.query.packageName;
  const version = req.query.version;
  depn(packageName, version).then(data=>{
    res.status(200).send(data);
  }).catch(e=>res.send({error: e}));
});

module.exports = router;