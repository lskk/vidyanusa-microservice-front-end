const copyright = "© 2018 Vidyanusa Institut Teknologi Bandung"
const Global = require('../global.json');

//Import untuk REST API
var restClient = require('node-rest-client').Client;
var rClient = new restClient();
// var rClient = new restClient({
//  proxy:{
//            host:Global.proxy_host,
//            port: Global.proxy_port,
//            user:Global.proxy_user,
//            password:Global.proxy_password
//        }
// });

var base_api_general_url = Global.api_global;

var async = require('async')

exports.pencapaian = function(req, res){

    var session = req.session

    //Mencek apakah pengguna masuk sebagai sebagai guru
    if(session.peran == null || session.peran != 3){//Bukan sebagai siswa
        return res.redirect('/')//Di arahkan ke route index
    }else{//Sebagai siswa

        //Promise dapatkan hasil kegiatan -> push ke array jumlah kegiatan
        let kategoriKegiatan = ['597731cc4dbe0e133eb90569','597731ff4dbe0e133eb9056b','5a4109b5de3b6b3d25cde157','597732104dbe0e133eb9056c','597731e84dbe0e133eb9056a','597731864dbe0e133eb90567','597731ac4dbe0e133eb90568']
        //disiplin,jujur,kerjasama,peduli,percaya diri,santun,tanggung_jawab
        var jumlahKegiatan = []

        for(let a=0;a<kategoriKegiatan.length;a++){
          args = {
            data: {
                    access_token: session.token,
                    kategori: kategoriKegiatan[a],
                    pengguna: session.id_pengguna
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          };

          rClient.post(Global.devel_api_portal+'/gamifikasi/jumlah_kegiatan', args, function (data, response) {
              if(data.success == true){
                //console.log('DDD: '+data.data)
                  jumlahKegiatan.push(data.data)
              }else{
                  //Gagal
              }
          });
        }


        setTimeout(function(){
          //console.log('kerjsama: '+jumlahKegiatan[2])

          return res.render('member/gamifikasi/pencapaian',{pencapaian: jumlahKegiatan, title : 'Pencapaian', username: session.username, access_token:session.token, user_id: session.id_pengguna,disiplin: jumlahKegiatan[0],jujur: jumlahKegiatan[1],kerjasama: jumlahKegiatan[2],peduli: jumlahKegiatan[3],percaya_diri: jumlahKegiatan[4],santun: jumlahKegiatan[5], tanggung_jawab: jumlahKegiatan[6]})//disiplin,jujur,kerjasama,peduli,percaya diri,santun,tanggung_jawab
        }, 3000);


        /*
        //Promise dapatkan hasil kegiatan
        const promiseHasilKegiatan =  new Promise(function (resolve, reject) {

          for(let a=0;a<kategoriKegiatan.length;a++){
            args = {
              data: {
                      access_token: session.token,
                      kategori: kategoriKegiatan[a],
                      pengguna: session.id_pengguna
              },
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            };

            rClient.post(Global.devel_api_portal+'/gamifikasi/jumlah_kegiatan', args, function (data, response) {
                if(data.success == true){
                    jumlahKegiatan.push(data.data)
                }else{
                    //Gagal
                }
            });
          }

          resolve(true)
        });

        //Atur promise
        const consumePromise = function(){
          promiseHasilKegiatan
            .then(function(){
              //disiplin,jujur,kerjasama,peduli,percaya diri,santun,tanggung_jawab
              console.log('disiplin: '+jumlahKegiatan[0])
              return res.render('member/gamifikasi/pencapaian',
              {pencapaian_disiplin: jumlahKegiatan[0], pencapaian_jujur: jumlahKegiatan[1],pencapaian_kerjasama: jumlahKegiatan[2],pencapaian_peduli: jumlahKegiatan[3],pencapaian_percaya_diri: jumlahKegiatan[4],pencapaian_santun: jumlahKegiatan[5],pencapaian_tanggung_jawab: jumlahKegiatan[6], title : 'Pencapaian', username: session.username, access_token:session.token, user_id: session.id_pengguna}
              )
            })
            .catch(function(){
              return res.json({success: false, data: {message:'error'}})
            })
        };

        consumePromise();
        */

    }

}
