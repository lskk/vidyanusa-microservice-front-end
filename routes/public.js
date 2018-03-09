var express = require('express');
var router = express.Router();
require('express-group-routes');

var index_controller = require('../controllers/indexController');

router.get('/', index_controller.index);
router.get('/log', index_controller.index);

router.get('/masuk', index_controller.masuk_form);

router.get('/atur_ulang_sandi', index_controller.atur_ulang_sandi);

router.group("/daftar", (router) => {
    router.get("/", index_controller.daftar);
    router.get("/default", index_controller.daftar_default);
    router.get("/siswa", index_controller.daftar_siswa);
    router.get("/guru", index_controller.daftar_guru);

    router.post("/guru", index_controller.daftar_guru_proses);
    router.post("/siswa", index_controller.daftar_siswa_proses);
});

module.exports = router;
