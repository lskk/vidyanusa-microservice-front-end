var express = require('express');
var router = express.Router();

//Ambil daftar Log via service API
router.get('/log/via_service', function(req, res, next) {
  res.send('tess');
});

//Ambil langsung query ke DB
router.get('/log/langsung', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
