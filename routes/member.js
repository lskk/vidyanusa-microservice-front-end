var express = require('express');
var router = express.Router();
var multer = require('multer'),
	bodyParser = require('body-parser'),
	path = require('path');

var member_controller = require('../controllers/memberController');
var sekolah_controller = require('../controllers/sekolahController');
var guru_controller = require('../controllers/guruController');
var siswa_controller = require('../controllers/siswaController');

var formidable = require('formidable')
const fs = require('fs')


router.get('/', member_controller.index);

router.get('/dashboard', member_controller.dashboard);

router.group("/guru", (router) => {
    router.get("/kelas/", guru_controller.kelas);
		router.get("/kelas/:id", guru_controller.kelas_detail);
    router.get("/kelas/daftar", guru_controller.daftar_kelas);
		router.get("/pengaturan", guru_controller.pengaturan);
		router.post("/pengaturan/profil/ubah", guru_controller.pengaturan_profil_ubah);
		router.post("/pengaturan/foto_profil/ubah", multer({ dest: './uploads/'}).single('foto'), guru_controller.pengaturan_foto_profil_ubah);
});

router.group("/sekolah", (router) => {
	  router.get("/kegiatan/hapus/:id/:pengguna", sekolah_controller.kegiatan_hapus);
    router.get("/kelas/", sekolah_controller.kelas);
    router.get("/kelas/detail/:id", sekolah_controller.kelas_detail);
		router.get("/pengaturan", sekolah_controller.pengaturan);
		router.post("/pengaturan/profil/ubah", sekolah_controller.pengaturan_profil_ubah);
		router.post("/pengaturan/foto_profil/ubah", multer({ dest: './uploads/'}).single('foto'), sekolah_controller.pengaturan_foto_profil_ubah);
    router.post("/kelas/tambah", sekolah_controller.kelas_tambah);
    router.post("/kelas/detail/ubah/nama", sekolah_controller.kelas_ubah_nama);
    router.post("/kelas/detail/ubah/mapel", sekolah_controller.kelas_ubah_mapel);
    router.post("/kelas/detail/ubah/guru", sekolah_controller.kelas_ubah_guru);
		router.post("/kelas/detail/ubah/siswa", sekolah_controller.kelas_ubah_siswa);
    //router.get("/kelas/daftar", guru_controller.daftar_kelas);
});

router.group("/siswa", (router) => {
	router.get("/absensi", siswa_controller.absensi);
	router.get("/kegiatanku", siswa_controller.kegiatanku);
	router.get("/kegiatanku/hapus/:id/:pengguna", siswa_controller.kegiatanku_hapus);
	router.get("/pengaturan", siswa_controller.pengaturan);
	router.get("/pengaturan/portofolio", siswa_controller.pengaturan_portofolio);
	router.post("/pengaturan/kelas/tambah", siswa_controller.pengaturan_kelas_tambah);
	router.post("/pengaturan/prestasi/tambah", siswa_controller.pengaturan_prestasi_tambah);
	router.post("/pengaturan/pengalaman_organisasi/tambah", siswa_controller.pengaturan_pengalaman_organisasi_tambah);
	router.post("/pengaturan/minat_bakat/tambah", siswa_controller.pengaturan_minat_bakat_tambah);//bahasa_yang_dikuasai
	router.post("/pengaturan/bahasa_yang_dikuasai/tambah", siswa_controller.pengaturan_bahasa_yang_dikuasai_tambah);//
	router.post("/pengaturan/sertifikat/tambah", siswa_controller.pengaturan_sertifikat_tambah);
	router.post("/pengaturan/hobi/tambah", siswa_controller.pengaturan_hobi_tambah);
	router.post("/pengaturan/karya/tambah", siswa_controller.pengaturan_karya_tambah);
	router.post("/pengaturan/profil/ubah", siswa_controller.pengaturan_profil_ubah);
	router.post("/pengaturan/email/ubah", siswa_controller.pengaturan_email_ubah);
	router.post("/pengaturan/sandi/ubah", siswa_controller.pengaturan_sandi_ubah_manual);
	router.post("/pengaturan/medsos/ubah", siswa_controller.pengaturan_medsos_ubah);
	router.post("/pengaturan/foto_profil/ubah", multer({ dest: './uploads/'}).single('foto'), siswa_controller.pengaturan_foto_profil_ubah);
	//router.post("/kegiatan", multer({ dest: ''}).single('foto'), siswa_controller.tambah_kegiatan);
	router.post("/kegiatan", multer({ dest: './uploads/'}).single('foto'), siswa_controller.tambah_kegiatan);

});

module.exports = router;
