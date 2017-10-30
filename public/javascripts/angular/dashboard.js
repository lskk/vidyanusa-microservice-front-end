var angularModule = angular.module('dashboardApp',[])

angularModule.controller('controllerGetEmail', function($scope, $http, $window){
    var pengguna = $('#hidden-user-id').text()
    var access_token = $('#hidden-access-token').text()


    var base_api_general_url = 'http://apigeneral.vidyanusa.id';
    //var base_api_general_url = 'http://127.0.0.1:3001';

    //Request data email
    var reqEmail = {
        method: 'POST',
        url: base_api_general_url+'/ambil_email',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        data: {
            pengguna: pengguna,
            access_token: access_token
        }
    }

    $http(reqEmail).then(function(response){

        console.log("Data ambil email: "+JSON.stringify(response))


        $scope.email = response.data.data[0].email


    }, function(data){
        console.log("Data ambil email:"+data)

    });


})

angularModule.controller('controllerGetProfile', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3500';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: base_api_general_url+'/profil',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     username: username,
                     access_token: access_token
                   }
            }

  $http(reqProfil).then(function(response){

    console.log("Responsenya: "+JSON.stringify(response))
    var statusKembalian =  response.data.success

    if(statusKembalian == true){
      $scope.username = response.data.data[0].profil.username
      $scope.nama_lengkap = response.data.data[0].profil.nama_lengkap
      $scope.foto = response.data.data[0].profil.foto
      $scope.bio = response.data.data[0].profil.bio
    }else{
      window.location = 'http://vidyanusa.id/session_tidak_berlaku' //Diarahkan kehalaman keluar/logout
    }




  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetProfileKelasSiswa', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3500';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: base_api_general_url+'/profil/siswa',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     username: username,
                     access_token: access_token
                   }
            }

  $http(reqProfil).then(function(response){

    $scope.paraKelas = response.data.data[0].kelas


  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetProfilePrestasi', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3500';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: base_api_general_url+'/profil/siswa',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     username: username,
                     access_token: access_token
                   }
            }

  $http(reqProfil).then(function(response){

    $scope.paraPrestasi = response.data.data[0].prestasi


  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetProfilePengalamanOrganisasi', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3500';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: base_api_general_url+'/profil/siswa',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     username: username,
                     access_token: access_token
                   }
            }

  $http(reqProfil).then(function(response){

    $scope.paraPengalamanOrganisasi = response.data.data[0].pengalaman_organisasi


  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetProfileMinatBakat', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3500';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: base_api_general_url+'/profil/siswa',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     username: username,
                     access_token: access_token
                   }
            }

  $http(reqProfil).then(function(response){

    $scope.paraMinatBakat = response.data.data[0].minat_bakat


  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetProfileSertifikat', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3500';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: base_api_general_url+'/profil/siswa',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     username: username,
                     access_token: access_token
                   }
            }

  $http(reqProfil).then(function(response){

    $scope.paraSertifikat = response.data.data[0].sertifikat


  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetProfileHobi', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3500';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: base_api_general_url+'/profil/siswa',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     username: username,
                     access_token: access_token
                   }
            }

  $http(reqProfil).then(function(response){

    $scope.paraHobi = response.data.data[0].hobi


  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetProfileBahasa', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3500';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: base_api_general_url+'/profil/siswa',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     username: username,
                     access_token: access_token
                   }
            }

  $http(reqProfil).then(function(response){

    $scope.paraBahasa = response.data.data[0].bahasa_yang_dikuasai


  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetProfileKarya', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3500';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: base_api_general_url+'/profil/siswa',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     username: username,
                     access_token: access_token
                   }
            }

  $http(reqProfil).then(function(response){

    $scope.paraKarya = response.data.data[0].karya


  }, function(data){
    console.log(data)
  });


})

//controllerGetProfileMedsos
angularModule.controller('controllerGetProfileMedsos', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3500';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: base_api_general_url+'/profil/siswa',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     username: username,
                     access_token: access_token
                   }
            }

  $http(reqProfil).then(function(response){

    $scope.facebook = response.data.data[0].media_sosial.facebook
    $scope.instagram = response.data.data[0].media_sosial.instagram
    $scope.twitter = response.data.data[0].media_sosial.twitter

  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetProfileSiswa', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3500';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: base_api_general_url+'/profil/siswa',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     username: username,
                     access_token: access_token
                   }
            }

  $http(reqProfil).then(function(response){

    $scope.nama_lengkap = response.data.data[0].profil.nama_lengkap
    $scope.bio = response.data.data[0].profil.bio


  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerAllMapel', function($scope, $http, $window){
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request daftar mapel
  var reqMapel = {
             method: 'GET',
             url: base_api_general_url+'/mapel',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             }
            }

  $http(reqMapel).then(function(response){

    console.log("Responsenya: "+JSON.stringify(response.data.data))


    $scope.paraMapel = response.data.data
    // $scope.nama_lengkap = response.data.data[0].profil.nama_lengkap
    // $scope.foto = response.data.data[0].profil.foto
    // $scope.bio = response.data.data[0].profil.bio


  }, function(data){
    console.log(data)
  });


  //Request daftar materi berdasarkan mapel
  $('#mapel').change(function() {

    var selectIdMapel = $(this).val()
    //alert('Id mapel yg diambil:'+selectIdMapel)

    var reqMateri = {
               method: 'POST',
               url: base_api_general_url+'/mapel/materi',
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
               },
               transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
               },
               data: {
                       id_mapel: selectIdMapel
                     }
              }

    $http(reqMateri).then(function(response){

      console.log("Response materinya: "+JSON.stringify(response.data.data[0].materi))

      $scope.paraMateri = response.data.data[0].materi

    }, function(data){
      console.log(data)
    });

  })

})

angularModule.controller('controllerAllGuru', function($scope, $http, $window){
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request daftar guru
  var reqGuru = {
             method: 'POST',
             url: base_api_general_url+'/pengguna/guru/sekolah',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     access_token: $('#hidden-access-token').text(),
                     id_sekolah: $('#hidden-id-sekolah').text()
                   }
            }

  $http(reqGuru).then(function(response){

    console.log("Response daftar gurunya: "+JSON.stringify(response.data.data))


    $scope.paraGuru = response.data.data

  }, function(data){
    console.log(data)
  });

})

angularModule.controller('controllerAllSiswa', function($scope, $http, $window){
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';

  //Request daftar siswa
  var reqSiswa = {
             method: 'POST',
             url: base_api_general_url+'/pengguna/siswa/sekolah',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     access_token: $('#hidden-access-token').text()
                   }
            }

  $http(reqSiswa).then(function(response){

    console.log("Response daftar siswanya: "+JSON.stringify(response.data.data))


    $scope.paraSiswa = response.data.data

  }, function(data){
    console.log(data)
  });

})

angularModule.controller('controllerAllKategoriKegiatan', function($scope, $http, $window){
  var base_api_general_url = 'http://apiportal.vidyanusa.id';

  //Request daftar mapel
  var reqMapel = {
             method: 'POST',
             url: base_api_general_url+'/kegiatan/kategori',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     access_token: $('#hidden-access-token').text()
                   }
            }

  $http(reqMapel).then(function(response){

    console.log("Response kategori kegiatan: "+JSON.stringify(response.data.data))


    $scope.categories = response.data.data


  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetTimeline', function($scope, $http, $window){
  var access_token = $('#hidden-access-token').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3100';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';
  var base_api_portal_url = "http://apiportal.vidyanusa.id"

  //Request data timeline
  var reqTimeline = {
             method: 'POST',
             url: base_api_portal_url+'/kegiatan/daftar_semua',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     access_token: access_token
                   }
            }

  $http(reqTimeline).then(function(response){

    var data = response.data.data
    var banyakData = data.length

    var daftarTimeline = []

    for(var i = 0; i < banyakData; i++){

        daftarTimeline.push({
                          'username' : data[i].pengguna.profil.username,
                          'foto' : data[i].pengguna.profil.foto,
                          'created_at' : moment(data[i].created_at).fromNow(),
                          'judul' : data[i].judul,
                          'kategori' : data[i].kategori.nama_kategori,
                          'file_berkas' : data[i].file_berkas
                        })
    }

    $scope.timelines = daftarTimeline


  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerKegiatanku', function($scope, $http, $window){
  var access_token = $('#hidden-access-token').text()
  var user_id = $('#hidden-user-id').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3100';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';
  var base_api_portal_url = "http://apiportal.vidyanusa.id"

  //Request data timeline
  var reqKegiatanku = {
             method: 'POST',
             url: base_api_portal_url+'/kegiatan/daftar_per_pengguna',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     access_token: access_token,
                     pengguna: user_id
                   }
            }

  $http(reqKegiatanku).then(function(response){

    var data = response.data.data
    var banyakData = data.length

    var daftarKegiatanku = []
    console.log('kegiatanku:'+JSON.stringify(data))
    for(var i = 0; i < banyakData; i++){

        daftarKegiatanku.push({
                          'id' : data[i]._id,
                          'pengguna' : data[i].pengguna,
                          'created_at' : moment(data[i].created_at).fromNow(),
                          'judul' : data[i].judul,
                          'file_berkas' : data[i].file_berkas,
                          'nama_kategori': data[i].kategori.nama_kategori
                        })
    }

    $scope.activities = daftarKegiatanku


  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetAbsensi', function($scope, $http, $window){
  var access_token = $('#hidden-access-token').text()
  var user_id = $('#hidden-user-id').text()

  //var base_api_url = 'http://api.vidyanusa.id';
  var base_api_url = 'http://127.0.0.1:3100';
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';
  var base_api_portal_url = "http://apiportal.vidyanusa.id"

  //Request data timeline
  var reqAbsensi = {
             method: 'POST',
             url: base_api_portal_url+'/absensi/daftar_per_pengguna',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     access_token: access_token,
                     pengguna: user_id
                   }
            }

  $http(reqAbsensi).then(function(response){

    var data = response.data.data
    var banyakData = data.length

    var daftarAbsensi = []
    console.log('absensi:'+data)
    for(var i = 0; i < banyakData; i++){

        daftarAbsensi.push({
                          'created_at' : moment(data[i].created_at).format("dddd, MMMM Do YYYY, h:mm:ss a"),
                          'keterangan' : data[i].keterangan,
                          'tanggal' : moment(data[i].created_at).format("D MMMM  YYYY"),
                          'jam' : moment(data[i].created_at).format("h:mm:ss a"),
                          'lokasi1' : data[i].lokasi.latitude,
                          'lokasi2' : data[i].lokasi.longitude,
                        })
    }

    $scope.paraAbsensi = daftarAbsensi


  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetKelas', function($scope, $http, $window){
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';
  var access_token = $('#hidden-access-token').text()
  var id_sekolah = $('#hidden-id-sekolah').text()
  console.log('akses token get kelas:'+access_token)
  console.log('id sekolah get kelas:'+id_sekolah)
  //Request daftar kelas
  var reqKelas = {
             method: 'POST',
             url: base_api_general_url+'/daftar_kelas',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     access_token: access_token,
                     id_sekolah: id_sekolah
                   }
            }

  $http(reqKelas).then(function(response){

    console.log("Response ambil kelas: "+JSON.stringify(response.data.data))


    $scope.paraKelas = response.data.data
    // $scope.nama_lengkap = response.data.data[0].profil.nama_lengkap
    // $scope.foto = response.data.data[0].profil.foto
    // $scope.bio = response.data.data[0].profil.bio


  }, function(data){
    console.log(data)
  });



})

angularModule.controller('controllerGetSiswaDalamKelas', function($scope, $http, $window){
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';
  var access_token = $('#hidden-access-token').text()
  var id_kelas = $('#hidden-id-kelas').text()

  //Request daftar siswa dalam kelas
  var reqKelas = {
             method: 'POST',
             url: base_api_general_url+'/daftar_kelas/siswa',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     access_token: access_token,
                     kelas: id_kelas
                   }
            }

  $http(reqKelas).then(function(response){

    console.log("Response ambil kelas: "+JSON.stringify(response.data.data))


    $scope.students = response.data.data
    // $scope.nama_lengkap = response.data.data[0].profil.nama_lengkap
    // $scope.foto = response.data.data[0].profil.foto
    // $scope.bio = response.data.data[0].profil.bio


  }, function(data){
    console.log(data)
  });



})

angularModule.controller('controllerGetKelasPunyaGuru', function($scope, $http, $window){
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';
  var access_token = $('#hidden-access-token').text()
  var id_pengguna = $('#hidden-access-user-id').text()

  //Request daftar kelas berdasarkan guru
  var reqKelas = {
             method: 'POST',
             url: base_api_general_url+'/daftar_kelas/guru',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     access_token: access_token,
                     pengguna: id_pengguna
                   }
            }

  $http(reqKelas).then(function(response){

    console.log("Response ambil kelas per pengguna: "+JSON.stringify(response.data.data))


    $scope.paraKelas = response.data.data[0].mengajar




  }, function(data){
    console.log(data)
  });



})

angularModule.controller('controllerGetDetailKelas', function($scope, $http, $window){
  var base_api_general_url = 'http://apigeneral.vidyanusa.id';
  var access_token = $('#hidden-access-token').text()
  var id_kelas = $('.idKelas').text()

  console.log('akses token get detail kelas:'+access_token)
  console.log('id kelas get detail:'+id_kelas)

  //Request detail kelas
  var reqKelas = {
             method: 'POST',
             url: base_api_general_url+'/daftar_kelas/detail',
             headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             transformRequest: function(obj) {
                  var str = [];
                  for(var p in obj)
                  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                  return str.join("&");
             },
             data: {
                     access_token: access_token,
                     id_kelas: id_kelas
                   }
            }

  $http(reqKelas).then(function(response){

    console.log("Response ambil detail kelas: "+JSON.stringify(response.data.data))


    $scope.details = response.data.data

    //Mengurai data mapel
    var dataMapel = response.data.data[0].mapel
    var banyakDataMapel = dataMapel.length

    var daftarMapel = []
    //console.log('kegiatanku:'+data)
    for(var i = 0; i < banyakDataMapel; i++){

        daftarMapel.push({
                          'id' : dataMapel[i]._id,
                          'nama' : dataMapel[i].nama_mapel
                        })
    }

    $scope.paraMapel = daftarMapel

    //Mengurai data guru
    var dataGuru = response.data.data[0].pengajar
    var banyakDataGuru = dataGuru.length

    var daftarGuru = []
    //console.log('kegiatanku:'+data)
    for(var i = 0; i < banyakDataGuru; i++){

        daftarGuru.push({
                          'nama_guru' : dataGuru[i].guru.profil.nama_lengkap,
                          'nama_mapel' : dataGuru[i].mapel.nama_mapel
                        })
    }

    $scope.paraGuru = daftarGuru




  }, function(data){
    console.log(data)
  });



})
