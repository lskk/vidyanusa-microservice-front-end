const copyright = "© 2017 Vidyanusa Institut Teknologi Bandung"

//Import untuk REST API
var restClient = require('node-rest-client').Client;
var rClient = new restClient();


//Pengaturan FTP
var Client = require('ftp')
var client = new Client()
var path = require('path')
var multer = require('multer')
var FTPStorage = require('multer-ftp')
var FTP = require('ftp')
var fs = require('fs')

var base_api_general_url = 'http://apigeneral.vidyanusa.id';

var connectionProperties = {
    host: "",
    user: "",
    password: ""
};

var async = require('async')

exports.kelas = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai guru
    if(session.peran == null || session.peran != 4){//Bukan sebagai guru
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai guru
        return res.render('member/guru/kelas',{title : 'Manajemen Kelas', username: session.username, access_token:session.token, user_id: session.id_pengguna})
    }

}

exports.kelas_detail = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai guru
    if(session.peran == null || session.peran != 4){//Bukan sebagai guru
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai guru

      var idKelas = req.params.id
      //Cek apakah kelas yang dituju terdaftar di db
      args = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
                access_token: session.token,
                id_kelas: idKelas
        },
      };

      rClient.post(base_api_general_url+'/daftar_kelas/detail', args, function (data, response) {

          if(data.success == true){

            if(data.data.length > 0){//Kelas ditemukan

              return res.render('member/guru/kelas_detail',{title : 'Detail Kelas', username: session.username, access_token:session.token, user_id: session.id_pengguna, id_kelas: idKelas})

            }else{//Kelas tidak ditemukan
              req.flash('pesan', 'Kelas yang anda tuju tidak terdaftar dalam database.');
              return res.redirect('/member/guru/kelas')
            }

          }else{
            req.flash('pesan', 'Kelas yang anda tuju tidak ditemukan');
            return res.redirect('/member/guru/kelas')
          }
       })



    }

}

exports.daftar_kelas = function(req, res){
  var session = req.session

  //Mencek apakah pengguna masuk sebagai sebagai guru
  if(session.peran == null || session.peran != 4){//Bukan sebagai guru
      return res.redirect('/')//Di arahkan ke route index
  }else{//Sebagai guru
      return res.render('member/guru/daftar_kelas',{title : 'Daftar Kelas', username: session.username, access_token:session.token})
  }
}

exports.pengaturan = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai guru
    if(session.peran == null || session.peran != 4){//Bukan sebagai guru
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa
        return res.render('member/guru/pengaturan',{title : 'Pengaturan', username: session.username, access_token:session.token,user_id:session.id_pengguna})
    }

}

exports.pengaturan_profil_ubah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai siswa
    if(session.peran == null || session.peran != 4){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai guru

      args = {
        data: {
                access_token: session.token,
                nama_lengkap: req.body.nama_lengkap,
                bio: req.body.bio,
                pengguna: req.body.pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/pengaturan/guru/profil/ubah', args, function (data, response) {

          if(data.success == true){
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/guru/pengaturan')
          }else{
              console.log('KEMBALIAN:'+JSON.stringify(data.data))
              req.flash('pesan', data.data.message);
              return res.redirect('/member/guru/pengaturan')
          }

      });

    }

}

exports.pengaturan_foto_profil_ubah = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai guru
    if(session.peran == null || session.peran != 4){//Bukan sebagai guru
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai guru


      var foto = req.file

      var ekstensiFile;

      if(foto == null){
        req.flash('pesan', 'Mohon pilih foto profil yang akan anda upload.');
        return res.redirect('/member/guru/pengaturan')
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

              rClient.post(base_api_general_url+'/pengaturan/guru/foto_profil/ubah', args, function (data, response) {

                  if(data.success == true){
                      req.flash('pesan', data.data.message);
                      return res.redirect('/member/siswa/pengaturan')
                  }else if(data.success == false){
                      req.flash('pesan', data.data.message);
                      //req.flash('pesan', JSON.stringify(data));
                      return res.redirect('/member/siswa/pengaturan')
                  }else{
                    console.log('KEMBALIAN GURU UPLOAD FOTO:'+data)
                    req.flash('pesan', 'Unknown issue.');
                    return res.redirect('/member/guru/pengaturan')
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
