var express = require('express');
var router = express.Router();
require('express-group-routes');

var index_controller = require('../controllers/indexController');

router.get('/', function(req, res, next) {
  //Dicek dahulu apakah sudah Login
  var sess = req.session

  if(sess.peran != null){
    return res.redirect('/dashboard')
  }else{
    return res.redirect('/public')
  }

});

router.get('/dashboard', function(req, res, next) {

  return res.redirect('/member/dashboard')
  //return res.send('dashboard')
});

router.get('/masuk', function(req, res){
  return res.redirect('/public/masuk')
});

router.get('/atur_ulang_sandi', function(req, res){
    return res.redirect('/public/atur_ulang_sandi')
});

router.post('/atur_ulang_sandi', index_controller.atur_ulang_sandi_proses);

router.get('/keluar', index_controller.keluar);

router.get('/session_tidak_berlaku', index_controller.keluar_session_tidak_berlaku);

router.post('/masuk', index_controller.masuk);

router.get('/masuk_session_expired', index_controller.masuk_session_expired);

router.group("/daftar", (router) => {
    router.get("/", function(req, res) {
      res.redirect('/public/daftar')
    });
    router.get("/default", function(req, res) {
      res.redirect('/public/daftar/default')
    });
    router.get("/siswa", function(req, res) {
      res.redirect('/public/daftar/siswa')
    });
    router.get("/guru", function(req, res) {
      res.redirect('/public/daftar/guru')
    });
    router.post("/guru", function(req, res) {
      res.redirect('/public/daftar/guru')
    });
    router.post("/siswa", function(req, res) {
      res.redirect('/public/daftar/siswa')
    });
});

module.exports = router
