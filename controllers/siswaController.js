const copyright = "© 2018 Vidyanusa Institut Teknologi Bandung"
const Global = require('../global.json');
//Pengaturan REST API
var restClient = require('node-rest-client').Client;
var rClient = new restClient();
// var rClient = new restClient({
//  proxy:{
//    host:Global.proxy_host,
//    port: Global.proxy_port,
//    user:Global.proxy_user,
//    password:Global.proxy_password
//        }
// });

//Import library pengatur prosedur
var async = require('async')

//Pengaturan FTP
var Client = require('ftp')
var client = new Client()
var path = require('path')
var multer = require('multer')
var FTPStorage = require('multer-ftp')
var FTP = require('ftp')
var fs = require('fs')

var connectionProperties = {
  host: Global.ftp_host,
  user: Global.ftp_user,
  password: Global.ftp_password
};

//Variable Global API yang digunakan
var base_api_portal_url = Global.api_portal;
var base_api_general_url = Global.api_global;

exports.absensi = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa
        return res.render('member/siswa/absensi',{title : 'Absensi', username: session.username, access_token:session.token,user_id:session.id_pengguna})
    }

}

exports.pengaturan = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa
        return res.render('member/siswa/pengaturan',{title : 'Pengaturan', username: session.username, access_token:session.token,user_id:session.id_pengguna})
    }

}

exports.pengaturan_kelas_tambah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa

      args = {
        data: {
                access_token: session.token,
                kode_kelas: req.body.kode_kelas,
                pengguna: req.body.pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/pengaturan/siswa/kelas/tambah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan')
          }

      });

    }

}

exports.pengaturan_portofolio = function (req, res) {

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if (session.peran == null || session.peran != 3) {//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    } else {//Sebagai siswa
        return res.render('member/siswa/pengaturan_portofolio', {
            title: 'Pengaturan',
            username: session.username,
            access_token: session.token,
            user_id: session.id_pengguna
        })
    }

}

exports.pengaturan_prestasi_tambah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa

      args = {
        data: {
                access_token: session.token,
                prestasi: req.body.prestasi,
                pengguna: req.body.pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/pengaturan/siswa/prestasi/tambah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }

      });

    }

}

exports.pengaturan_pengalaman_organisasi_tambah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa

      args = {
        data: {
                access_token: session.token,
                pengalaman_organisasi: req.body.pengalaman_organisasi,
                pengguna: req.body.pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/pengaturan/siswa/pengalaman_organisasi/tambah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }

      });

    }

}

exports.pengaturan_minat_bakat_tambah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa

      args = {
        data: {
                access_token: session.token,
                minat_bakat: req.body.minat_bakat,
                pengguna: req.body.pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/pengaturan/siswa/minat_bakat/tambah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }

      });

    }

}

exports.pengaturan_sertifikat_tambah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa

      args = {
        data: {
                access_token: session.token,
                sertifikat: req.body.sertifikat,
                pengguna: req.body.pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/pengaturan/siswa/sertifikat/tambah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }

      });

    }

}

exports.pengaturan_hobi_tambah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa

      args = {
        data: {
                access_token: session.token,
                hobi: req.body.hobi,
                pengguna: req.body.pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/pengaturan/siswa/hobi/tambah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }

      });

    }

}

exports.pengaturan_bahasa_yang_dikuasai_tambah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa

      args = {
        data: {
                access_token: session.token,
                bahasa_yang_dikuasai: req.body.bahasa_yang_dikuasai,
                pengguna: req.body.pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/pengaturan/siswa/bahasa_yang_dikuasai/tambah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }

      });

    }

}

//pengaturan_karya_tambah
exports.pengaturan_karya_tambah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa

      args = {
        data: {
                access_token: session.token,
                karya: req.body.karya,
                pengguna: req.body.pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/pengaturan/siswa/karya/tambah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data))
              req.flash('pesan', JSON.stringify(data));
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }

      });

    }

}

exports.pengaturan_profil_ubah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa

      args = {
        data: {
                access_token: session.token,
                nama_lengkap: req.body.nama_lengkap,
                bio: req.body.bio,
                pengguna: req.body.pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/pengaturan/siswa/profil/ubah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan')
          }

      });

    }

}

exports.pengaturan_email_ubah = function (req, res) {

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if (session.peran == null || session.peran != 3) {//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    } else {//Sebagai siswa

        args = {
            data: {
                access_token: session.token,
                pengguna: req.body.pengguna,
                email: req.body.email
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };


        rClient.post(base_api_general_url +'/pengaturan/siswa/email/ubah', args, function (data, response) {
            console.log('Kembalian dari ubah email:'+data)
            if (data.success == true) {
                console.log('KEMBALIAN:' + JSON.stringify(data.data))
                req.flash('pesan', data.data.message);
                return res.redirect('/member/siswa/pengaturan')
            } else {
                console.log('KEMBALIAN:' + JSON.stringify(data.data))
                req.flash('pesan', data.data.message);
                return res.redirect('/member/siswa/pengaturan')
            }

        });

    }

}

exports.pengaturan_sandi_ubah_manual = function (req, res) {

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if (session.peran == null || session.peran != 3) {//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    } else {//Sebagai siswa

        args = {
            data: {
                access_token: session.token,
                pengguna: req.body.pengguna,
                sandi: req.body.sandi
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };


        rClient.post(base_api_general_url +'/atur_ulang_sandi_manual', args, function (data, response) {
            console.log('Kembalian dari ubah email:'+data)
            if (data.success == true) {
                console.log('KEMBALIAN:' + JSON.stringify(data.data))
                req.flash('pesan', data.data.message);
                return res.redirect('/member/siswa/pengaturan')
            } else {
                console.log('KEMBALIAN:' + JSON.stringify(data.data))
                req.flash('pesan', data.data.message);
                return res.redirect('/member/siswa/pengaturan')
            }

        });

    }

}

exports.pengaturan_medsos_ubah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa

      args = {
        data: {
                access_token: session.token,
                pengguna:session.id_pengguna,
                facebook: req.body.facebook,
                instagram: req.body.instagram,
                twitter: req.body.twitter
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/pengaturan/siswa/medsos/ubah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', JSON.stringify(data.data));
              return res.redirect('/member/siswa/pengaturan/portofolio')
          }

      });

    }

}

exports.pengaturan_profil_ubah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa

      args = {
        data: {
                access_token: session.token,
                nama_lengkap: req.body.nama_lengkap,
                bio: req.body.bio,
                pengguna: req.body.pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/pengaturan/siswa/profil/ubah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/siswa/pengaturan')
          }

      });

    }

}

exports.pengaturan_foto_profil_ubah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa


      var foto = req.file

      var ekstensiFile;

      if(foto == null){
        req.flash('pesan', 'Mohon pilih foto profil yang akan anda upload.');
        return res.redirect('/member/siswa/pengaturan')
      }

      if(foto.mimetype == 'image/png'){
        ekstensiFile = '.png'
      } else if(foto.mimetype == 'image/jpeg'){
        ekstensiFile = '.jpg'
      }

      //Bila format bukan png atau jpeg maka ditolak untuk dilanjutkan
      if(foto.mimetype == 'image/png' || foto.mimetype == 'image/jpeg'){

        //Unggah foto ke FTP
        //Coba urai file nya
        console.log('REQ BODY:'+JSON.stringify(req.body))
        console.log('REQ FILE:'+JSON.stringify(req.file))

        async.series({
            one: function(callback) {
              client.connect(connectionProperties)
              callback(null, 1);
            },
            two: function(callback){
              //Proses upload ke FTP
               client.on('ready', function () {
                   console.log('ftp tersambung');
                   client.put(foto.path, foto.filename+ekstensiFile, function(err) {
                    if (err)
                    {
                      throw err;
                    }else{
                      console.log('UPLOAD BERHASIL')
                      //Hapus file yang ada dilokal direktori oleh multer
                      //Synchronous
                      // fs.unlinkSync(req.file.path);
                      // console.log('File berhasil dihapus.');
                      //Asynchronous
                      fs.unlink(req.file.path, function(err) {
                        if(err)
                          console.log('ERROR DELETE FILE:'+err)

                        console.log('File berhasil dihapus.');
                      });

                    }

                    //fs.closeSync()

                    client.end()
                  });
               });


              callback(null, 2);
            },
            three: function(callback){

              //Proses REST API
              args = {
                data: {
                        access_token: session.token,
                        pengguna: session.id_pengguna,
                        alamat_url_foto: 'http://filehosting.vidyanusa.id/'+foto.filename+ekstensiFile
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              };

              rClient.post(base_api_general_url+'/pengaturan/siswa/foto_profil/ubah', args, function (data, response) {

                  if(data.success == true){
                      req.flash('pesan', data.data.message);
                      return res.redirect('/member/siswa/pengaturan')
                  }else if(data.success == false){
                      req.flash('pesan', data.data.message);
                      //req.flash('pesan', JSON.stringify(data));
                      return res.redirect('/member/siswa/pengaturan')
                  }else{
                    req.flash('pesan', 'Unknown issue.');
                    return res.redirect('/member/siswa/pengaturan')
                  }

              });



              callback(null, 3);
            }
        }, function(err, results) {
            // results is now equal to: {one: 1, two: 2}
        })




      }else{

        req.flash('pesan', 'Ekstensi file yang diizinkan adalah .png atau .jpg atau .jpeg');
        return res.redirect('/member/siswa/pengaturan')

      }



    }

}

exports.kegiatanku = function(req, res){
  var session = req.session

  //Mencek apakah pengguna masuk sebagai sebagai siswa
  if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
      return res.redirect('/')//Di arahkan ke route index
  }else{//Sebagai siswa
      return res.render('member/siswa/kegiatanku',{title : 'Kegiatanku', username: session.username, access_token:session.token,user_id:session.id_pengguna})
  }
}

exports.kegiatanku_hapus = function(req, res){
  var session = req.session
  var idKegiatan = req.params.id
  var idPengguna = req.params.pengguna

  //Mencek apakah pengguna masuk sebagai sebagai siswa
  if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
      return res.redirect('/')//Di arahkan ke route index
  }else{//Sebagai siswa

    //Proses hapus kegiatanku
    args = {
      data: {
              access_token: session.token,
              id: idKegiatan,
              pengguna: idPengguna
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    rClient.post('http://apiportal.vidyanusa.id/kegiatan/hapus', args, function (data, response) {

        if(data.success == true){
            req.flash('pesan', 'Kegiatan berhasil dihapus');
            return res.redirect('/member/siswa/kegiatanku')
        }else if(data.success == false){
            req.flash('pesan', data.data.message);
            //req.flash('pesan', JSON.stringify(data));
            return res.redirect('/member/siswa/kegiatanku')
        }else{
          req.flash('pesan', 'Unknown issue.');
          return res.redirect('/member/siswa/kegiatanku')
        }

    });

      //return res.render('member/siswa/kegiatanku',{title : 'Kegiatanku', username: session.username, access_token:session.token,user_id:session.id_pengguna})
  }
}

exports.tambah_kegiatan = function(req, res){
  var session = req.session

  var fieldJudul = req.body.judul
  var idKategori = req.body.kategori
  var foto = req.file

  var ekstensiFile;

  if(foto == null){
    req.flash('pesan', 'Mohon pilih foto kegiatan anda.');
    return res.redirect('/dashboard')
  }

  if(foto.mimetype == 'image/png'){
    ekstensiFile = '.png'
  } else if(foto.mimetype == 'image/jpeg'){
    ekstensiFile = '.jpg'
  }

  //Bila format bukan png atau jpeg maka ditolak untuk dilanjutkan
  if(foto.mimetype == 'image/png' || foto.mimetype == 'image/jpeg'){



    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa



      //Coba urai file nya
      console.log('REQ BODY:'+JSON.stringify(req.body))
      console.log('REQ FILE:'+JSON.stringify(req.file))

      async.series({
          one: function(callback) {
            client.connect(connectionProperties)
            callback(null, 1);
          },
          two: function(callback){
            //Proses upload ke FTP
             client.on('ready', function () {
                 console.log('ftp tersambung');
                 client.put(foto.path, foto.filename+ekstensiFile, function(err) {
                  if (err)
                  {
                    throw err;
                  }else{
                    console.log('UPLOAD BERHASIL')
                    //Hapus file yang ada dilokal direktori oleh multer
                    //Synchronous
                    // fs.unlinkSync(req.file.path);
                    // console.log('File berhasil dihapus.');
                    //Asynchronous
                    fs.unlink(req.file.path, function(err) {
                      if(err)
                        console.log('ERROR DELETE FILE:'+err)

                      console.log('File berhasil dihapus.');
                    });

                  }

                  //fs.closeSync()

                  client.end()
                });
             });


            callback(null, 2);
          },
          three: function(callback){


            console.log('EKSTENSI FILE:'+ekstensiFile)
            //Proses REST API
            args = {
              data: {
                      access_token: session.token,
                      judul: fieldJudul,
                      kategori: idKategori,
                      file_berkas: 'http://filehosting.vidyanusa.id/'+foto.filename+ekstensiFile,
                      latitude: 0,
                      longitude: 0,
                      pengguna:session.id_pengguna
              },
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            };

            rClient.post(base_api_portal_url+'/kegiatan', args, function (data, response) {

                if(data.success == true){
                    req.flash('pesan', 'Kegiatan berhasil ditambahkan!');
                    return res.redirect('/dashboard')
                }else if(data.success == false){
                    req.flash('pesan', data.data.message);
                    //req.flash('pesan', JSON.stringify(data));
                    return res.redirect('/dashboard')
                }else{
                  req.flash('pesan', 'Unknown issue.');
                  return res.redirect('/dashboard')
                }

            });



            callback(null, 3);
          }
      }, function(err, results) {
          // results is now equal to: {one: 1, two: 2}
      })


    }

  }else{
    req.flash('pesan', 'Ekstensi file yang diizinkan adalah .png atau .jpg atau .jpeg');
    return res.redirect('/dashboard')
  }

}
