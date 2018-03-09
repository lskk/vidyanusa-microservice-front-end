var express = require('express');
var router = express.Router();

var testingController = require('../controllers/testingController');

//Ambil daftar Log via service API
router.get('/log/via_service', testingController.via_service);

//Ambil langsung query ke DB
router.get('/log/langsung', testingController.langsung);

module.exports = router;
