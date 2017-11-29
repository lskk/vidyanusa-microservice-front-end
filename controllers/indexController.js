const copyright = "© 2017 Vidyanusa Institut Teknologi Bandung"

//Untuk mengirim email
var nodemailer = require('nodemailer')

//Import untuk REST API
var restClient = require('node-rest-client').Client;
var rClient = new restClient();



var async = require('async')
//var base_api_url = 'http://api.vidyanusa.id';
var base_api_url = 'http://127.0.0.1:3500';
var base_api_general_url = 'http://apigeneral.vidyanusa.id';

exports.index = function(req, res) {
    return res.render('index', { title: 'Selamat datang', copyright: copyright, link: req.query.link, last: req.query.last });
};

exports.masuk_form = function (req, res) {
  res.render('masuk', {title: 'Masuk', copyright: copyright, link: req.query.link, last: req.query.last  })
}

exports.atur_ulang_sandi = function (req, res) {
    res.render('atur_ulang_sandi', {title: 'Atur Ulang Sandi', copyright: copyright})
}

exports.atur_ulang_sandi_proses = function (req, res) {

    //REST permohonan atur ulang sandi
    args = {
        data: {
            email  : req.body.email
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    rClient.post(base_api_general_url+'/atur_ulang_sandi', args, function (data, response) {

        if(data.success == true){//Jika kembalian untuk mengirim sandi ke email benar
            req.flash('pesan', data.data.message);
            return res.redirect('/atur_ulang_sandi')
        }else{
            return res.redirect('/atur_ulang_sandi')
        }
    });




}

exports.masuk = function(req, res) {

  args = {
  	data: { email  : req.body.email,
            sandi  : req.body.sandi,
            link   : req.body.link
    },
  	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  rClient.post(base_api_general_url+'/masuk', args, function (data, response) {

      if(data.success == true){

          //Tampung hasil kembalian
          var idPengguna = data.data.id_pengguna
          var username = data.data.username
          var peran = data.data.peran
          var token = data.data.access_token

          //Deklarasi session
          var sess = req.session
          sess.id_pengguna = idPengguna
          sess.username = username
          sess.peran = peran
          sess.token = token


          if (req.body.link == 'undefinedundefined') {
            return res.redirect('/dashboard')
          }else{
            return res.redirect(req.body.link+'?access_token='+sess.token)
          }

      }else{
          req.flash('pesan', data.data.message);
          return res.redirect('/masuk')
      }
    });

}

exports.masuk_session_expired = function(req, res) {

  req.flash('pesan', 'Session anda telah berakhir, silahkan masuk dengan mengisi form di atas.');
  return res.redirect('/masuk')

}

exports.keluar = function(req, res) {
    var session = req.session

    args = {
    	data: {
                    access_token: session.token,
                    pengguna: session.id_pengguna
      },
    	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    rClient.post(base_api_general_url+'/keluar', args, function (data, response) {

        if(data.success == true){
            //Menghapus session
            req.session.destroy()
            return res.redirect('/')
        }else{
            req.flash('pesan', 'Gagal keluar');
            return res.redirect('/dashboard')
        }

      });

}

exports.keluar_session_tidak_berlaku = function(req, res) {
    var session = req.session

    args = {
    	data: { access_token: session.token
      },
    	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    rClient.post(base_api_general_url+'/keluar', args, function (data, response) {

        if(data.success == true){
            //Menghapus session
            req.session.destroy()

            return res.redirect('/masuk_session_expired')

        }else{
            req.flash('pesan', 'Gagal keluar');
            return res.redirect('/dashboard')
        }

      });

}

exports.daftar = function (req,res) {
  return res.render('daftar', { title: 'Daftar', copyright: copyright });
}

exports.daftar_default = function (req,res) {
  return res.render('daftar_default', { title: 'Daftar', copyright: copyright });
}

exports.daftar_siswa = function (req,res) {
  return res.render('daftar_siswa', { title: 'Daftar', copyright: copyright });
}

exports.daftar_guru = function (req,res) {
  return res.render('daftar_guru', { title: 'Daftar', copyright: copyright });
}

exports.daftar_guru_proses = function (req,res) {

  args = {
  	data: { email: req.body.email,
      username: req.body.username,
      nama_lengkap: req.body.nama_lengkap,
      jenis_kelamin: req.body.jenis_kelamin,
      sandi: req.body.sandi,
      sekolah: req.body.sekolah},
  	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  rClient.post(base_api_general_url+'/daftar/proses/guru', args, function (data, response) {

     //console.log('Data Login: '+inputan.email+inputan.password)
      if(data.success == true){

          //Tampung hasil kembalian
          var idPengguna = data.data.id_pengguna
          var username = data.data.username
          var peran = data.data.peran
          var token = data.data.access_token

          //Deklarasi session
          var sess = req.session
          sess.id_pengguna = idPengguna
          sess.username = username
          sess.peran = peran
          sess.token = token

          return res.redirect('/dashboard')
      }else{
          var pesan = ""
          console.log("ERROR: "+JSON.stringify(data))

          //Prosedur pengembalian error
          async.series({
              one: function(callback) {
                for(var i=0;i<data.data.length;i++){
                  pesan += data.data[i].msg+", "
                }
                callback(null, 1);
              },
              two: function(callback){
                req.flash('pesan', pesan);
                console.log('Pesan error:'+pesan)
                return res.redirect('/daftar/guru')
                //return res.json({'error':pesan})
                callback(null, 2);
              }
          }, function(err, results) {
              // results is now equal to: {one: 1, two: 2}
          })

      }

    });

}

exports.daftar_siswa_proses = function (req,res) {

  args = {
  	data: {
      email: req.body.email,
      username: req.body.username,
      nama_lengkap: req.body.nama_lengkap,
      jenis_kelamin: req.body.jenis_kelamin,
      sandi: req.body.sandi,
      sekolah: req.body.sekolah},
  	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  rClient.post(base_api_general_url+'/daftar/proses/siswa', args, function (data, response) {

      if(data.success == true){

          //Tampung hasil kembalian
          var idPengguna = data.data.id_pengguna
          var username = data.data.username
          var peran = data.data.peran
          var token = data.data.access_token

          //Deklarasi session
          var sess = req.session
          sess.id_pengguna = idPengguna
          sess.username = username
          sess.peran = peran
          sess.token = token

          return res.redirect('/dashboard')
      }else{
          var pesan = ""

          async.series({
              one: function(callback) {
                console.log('Error: '+data)
                if (data.data[0].msg === undefined){
                  pesan = data.data[0].message
                }else{
                  for(var i=0;i<data.data.length;i++){
                    pesan += data.data[i].msg+", "
                  }
                }

                callback(null, 1);
              },
              two: function(callback){
                console.log("FULL KEMBALIAN: "+JSON.stringify(data))
                console.log("PESAN: "+pesan)
                req.flash('pesan', pesan);
                return res.redirect('/daftar/siswa')

                callback(null, 2);
              }
          }, function(err, results) {
              // results is now equal to: {one: 1, two: 2}
          })


      }

    });

}
