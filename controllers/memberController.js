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

var async = require('async')
var base_api_general_url = 'http://apigeneral.vidyanusa.id';

exports.index = function(req, res){

    var sess = req.session
    if(sess.peran != null){
        return res.redirect('/dashboard')
    }else{
        return res.redirect('/')
    }

}

exports.dashboard = function(req, res) {

    var session = req.session

    if(session.peran == 4){//Sebagai guru
      return res.render('member/guru/dashboard',{title : 'Dashboard', username: session.username, access_token:session.token})
    }else if(session.peran == 2){//Sebagai sekolah

      //Ambil id sekolah berdasarkan id pengguna
      console.log('akses token:'+session.token)
      console.log('pengguna:'+session.id_pengguna)

      args = {
        data: {
                access_token: session.token,
                pengguna: session.id_pengguna
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      };

      rClient.post(base_api_general_url+'/daftar_sekolah/pengguna', args, function (data, response) {

          if(data.success == true){
              session.sekolah = data.data[0].sekolah
              return res.render('member/sekolah/dashboard',{title : 'Dashboard', username: session.username, access_token:session.token, sekolah:session.sekolah})
          }else{
              req.flash('pesan', data.data.message);
              //console.log(JSON.stringify(data))
              return res.redirect('/keluar')
          }

      });


    }else if(session.peran == 3){//Sebagai siswa
      return res.render('member/siswa/dashboard',{title : 'Dashboard', username: session.username, access_token:session.token, pengguna:session.id_pengguna})
    }else if(session.peran == 1){//Sebagai administrator
      return res.send('dashboard Administrator')
    }else if(session.peran == null){//Tidak terdaftar pengguna nya
      return res.redirect('/')
    }

};
