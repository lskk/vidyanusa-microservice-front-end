const copyright = "© 2017 Vidyanusa Institut Teknologi Bandung"

//Import untuk REST API
var restClient = require('node-rest-client').Client;
//var rClient = new restClient();
var rClient = new restClient({
 proxy:{
   host:Global.proxy_host,
   port: Global.proxy_port,
   user:Global.proxy_user,
   password:Global.proxy_password
       }
});

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

var async = require('async')
var base_api_general_url = 'http://apigeneral.vidyanusa.id';
//var base_api_general_url = 'http://localhost:3001';

exports.kegiatan_hapus = function(req, res){
  var session = req.session
  var idKegiatan = req.params.id
  var idPengguna = req.params.pengguna

  //Mencek apakah pengguna masuk sebagai sebagai sekolah
  if(session.peran == null || session.peran != 2){//Bukan sebagai sekolah
      return res.redirect('/')//Di arahkan ke route index
  }else{//Sebagai siswa

    //Proses hapus kegiatan
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
            return res.redirect('/member/dashboard')
        }else if(data.success == false){
            req.flash('pesan', data.data.message);
            //req.flash('pesan', JSON.stringify(data));
            return res.redirect('/member/dashboard')
        }else{
          req.flash('pesan', 'Unknown issue.');
          return res.redirect('/member/dashboard')
        }

    });

      //return res.render('member/siswa/kegiatanku',{title : 'Kegiatanku', username: session.username, access_token:session.token,user_id:session.id_pengguna})
  }
}

exports.pengaturan = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai sekolah
    if(session.peran == null || session.peran != 2){//Bukan sebagai sekolah
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa
        return res.render('member/sekolah/pengaturan',{title : 'Pengaturan', username: session.username, access_token:session.token,user_id:session.id_pengguna})
    }

}

exports.pengaturan_profil_ubah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai sekolah
    if(session.peran == null || session.peran != 2){//Bukan sebagai sekolah
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai sekolah

      args = {
        data: {
                access_token: session.token,
                nama_lengkap: req.body.nama_lengkap,
                bio: req.body.bio,
                pengguna: req.body.pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post('http://apigeneral.vidyanusa.id/pengaturan/guru/profil/ubah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/sekolah/pengaturan')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/sekolah/pengaturan')
          }

      });

    }

}

exports.pengaturan_foto_profil_ubah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai sekolah
    if(session.peran == null || session.peran != 2){//Bukan sebagai sekolah
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai sekolah


      var foto = req.file

      var ekstensiFile;

      if(foto == null){
        req.flash('pesan', 'Mohon pilih foto profil yang akan anda upload.');
        return res.redirect('/member/sekolah/pengaturan')
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

              rClient.post('http://apigeneral.vidyanusa.id/pengaturan/sekolah/foto_profil/ubah', args, function (data, response) {

                  if(data.success == true){
                      req.flash('pesan', data.data.message);
                      return res.redirect('/member/sekolah/pengaturan')
                  }else if(data.success == false){
                      req.flash('pesan', data.data.message);
                      //req.flash('pesan', JSON.stringify(data));
                      return res.redirect('/member/sekolah/pengaturan')
                  }else{
                    console.log('KEMBALIAN SEKOLAH UPLOAD FOTO:'+data)
                    req.flash('pesan', 'Unknown issue.');
                    return res.redirect('/member/sekolah/pengaturan')
                  }

              });



              callback(null, 3);
            }
        }, function(err, results) {
            // results is now equal to: {one: 1, two: 2}
        })
      }else{

        req.flash('pesan', 'Ekstensi file yang diizinkan adalah .png atau .jpg atau .jpeg');
        return res.redirect('/member/sekolah/pengaturan')

      }

    }

}

exports.kelas = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai guru
    if(session.peran == null || session.peran != 2){//Bukan sebagai sekolah
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai sekolah
        console.log('id sekolah:'+session.sekolah)
        return res.render('member/sekolah/kelas',{title : 'Manajemen Kelas', username: session.username, access_token:session.token, sekolah:session.sekolah})
    }

}

exports.kelas_detail = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai guru
    if(session.peran == null || session.peran != 2){//Bukan sebagai sekolah
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai sekolah
        console.log('ID KELAS:'+req.params.id)
        return res.render('member/sekolah/kelas_detail',{title : 'Detail Kelas', username: session.username, access_token:session.token, sekolah:session.sekolah, kelas:req.params.id})
    }

}

exports.kelas_tambah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai guru
    if(session.peran == null || session.peran != 2){//Bukan sebagai sekolah
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai sekolah

      args = {
        data: {
                access_token: session.token,
                nama_kelas: req.body.nama_kelas,
                sekolah: req.body.sekolah
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/daftar_kelas/tambah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/sekolah/kelas')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/sekolah/kelas')
          }

      });

    }

}

exports.kelas_ubah_nama = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai guru
    if(session.peran == null || session.peran != 2){//Bukan sebagai sekolah
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai sekolah

        args = {
          data: {
                  access_token: session.token,
                  kelas: req.body.kelas,
                  nama: req.body.nama
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };

        rClient.post(base_api_general_url+'/daftar_kelas/ubah_nama', args, function (data, response) {

            if(data.success == true){
                console.log('KEMBALIAN:'+JSON.stringify(data.data))
                req.flash('pesan', data.data.message);
                return res.redirect('/member/sekolah/kelas/detail/'+req.body.kelas+'')
            }else{
                console.log('KEMBALIAN:'+JSON.stringify(data.data))
                req.flash('pesan', data.data.message);
                return res.redirect('/member/sekolah/kelas/detail/'+req.body.kelas+'')
            }

        });


    }

}

exports.kelas_ubah_mapel = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai guru
    if(session.peran == null || session.peran != 2){//Bukan sebagai sekolah
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai sekolah

        args = {
          data: {
                  access_token: session.token,
                  kelas: req.body.kelas,
                  mapel: req.body.mapel
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };

        rClient.post(base_api_general_url+'/daftar_kelas/ubah_mapel', args, function (data, response) {

            if(data.success == true){
                //console.log('KEMBALIAN:'+JSON.stringify(data.data))
                req.flash('pesan', data.data.message);
                return res.redirect('/member/sekolah/kelas/detail/'+req.body.kelas+'')
            }else{
                //console.log('KEMBALIAN:'+JSON.stringify(data.data))
                req.flash('pesan', data.data.message);
                return res.redirect('/member/sekolah/kelas/detail/'+req.body.kelas+'')
            }

        });


    }

}

exports.kelas_ubah_siswa = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sekolah
    if(session.peran == null || session.peran != 2){//Bukan sebagai sekolah
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai sekolah

        args = {
          data: {
                  access_token: session.token,
                  kelas: req.body.kelas,
                  siswa: req.body.siswa
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };

        rClient.post(base_api_general_url+'/daftar_kelas/ubah_siswa', args, function (data, response) {

            if(data.success == true){
                //console.log('KEMBALIAN:'+JSON.stringify(data.data))
                req.flash('pesan', data.data.message);
                return res.redirect('/member/sekolah/kelas/detail/'+req.body.kelas+'')
            }else{
                //console.log('KEMBALIAN:'+JSON.stringify(data.data))
                req.flash('pesan', JSON.stringify(data.data.message));
                return res.redirect('/member/sekolah/kelas/detail/'+req.body.kelas+'')
            }

        });


    }

}

exports.kelas_ubah_guru = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai guru
    if(session.peran == null || session.peran != 2){//Bukan sebagai sekolah
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai sekolah

        args = {
          data: {
                  access_token: session.token,
                  kelas: req.body.kelas,
                  mapel: req.body.mapel,
                  guru: req.body.guru
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };

        rClient.post(base_api_general_url+'/daftar_kelas/ubah_guru', args, function (data, response) {

            if(data.success == true){
                //console.log('KEMBALIAN:'+JSON.stringify(data.data))
                req.flash('pesan', data.data.message);
                return res.redirect('/member/sekolah/kelas/detail/'+req.body.kelas+'')
            }else{
                //console.log('KEMBALIAN:'+JSON.stringify(data.data))
                req.flash('pesan', data.data.message);
                return res.redirect('/member/sekolah/kelas/detail/'+req.body.kelas+'')
            }

        });


    }

}
