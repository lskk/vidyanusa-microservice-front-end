const global = require('../global.json');
const base_api_general_url = global.api_global;
const restClient = require('node-rest-client').Client;
const rClient = new restClient();
const logs = require('../models/logModel');
const User = require('../models/userModel');

// var rClient = new restClient({
//  proxy:{
//            host:global.proxy_host,
//            port: global.proxy_port,
//            user:global.proxy_user,
//            password:global.proxy_password
//        }
// });


exports.via_service = function(req, res){
    console.log('MASUK');
    rClient.get(global.devel_api_global+'/log', function (data, response) {
        if(data.success == true){
            res.json(data);
        }else{
            res.send("Gagal");
        }
    });
}

exports.langsung = function(req, res){
    logs.find({})
        .sort([['created_at', 'descending']])
        .populate({ path: 'pengguna', select: 'profil.username profil.foto' })

        .exec(function (err, results) {
            if (err) {
                return res.json({success: false, data: err})
            }else{
                return res.json({success: true, data: results})
            }

        });
}
