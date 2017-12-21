var angularModuleFilterFromNow = angular.module('filterDateFromNow',[]).filter("date", function() {
  moment.lang("ru");
  return function(date) {
    //moment(data[i].created_at).fromNow(),
    return moment(new Date(date)).fromNow();
  };
});
var angularModule = angular.module('dashboardApp',['angularMoment','filterDateFromNow'])
const Global = require('../global.json');

angularModule.controller('controllerGetEmail', function($scope, $http, $window){
    var pengguna = $('#hidden-user-id').text()
    var access_token = $('#hidden-access-token').text()

    //Request data email
    var reqEmail = {
        method: 'POST',
        url: Global.devel_api_global+'/ambil_email',
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

      // console.log("Data ambil email: "+JSON.stringify(response))


        $scope.email = response.data.data[0].email


    }, function(data){
        //console.log("Data ambil email:"+data)

    });


})

angularModule.controller('controllerGetProfile', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: Global.devel_api_global+'/profil',
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

    //console.log("ResponseKembalianAmbilProfil: "+JSON.stringify(response))
    var statusKembalian =  response.data.success

    if(statusKembalian == true){
      $scope.username = response.data.data[0].profil.username
      $scope.nama_lengkap = response.data.data[0].profil.nama_lengkap
      $scope.foto = response.data.data[0].profil.foto
      $scope.bio = response.data.data[0].profil.bio
    }else{
      window.location = 'http://localhost:3000/session_tidak_berlaku' //Diarahkan kehalaman keluar/logout
    }




  }, function(data){
    console.log(data)
  });


})

angularModule.controller('controllerGetProfileKelasSiswa', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: Global.devel_api_global+'/profil/siswa',
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
    //console.log(data)
  });
})

angularModule.controller('controllerGetProfilePrestasi', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: Global.devel_api_global+'/profil/siswa',
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

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: Global.devel_api_global+'/profil/siswa',
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
  });
})

angularModule.controller('controllerGetProfileMinatBakat', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: Global.devel_api_global+'/profil/siswa',
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
    //console.log(data)
  });
})

angularModule.controller('controllerGetProfileSertifikat', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: Global.devel_api_global+'/profil/siswa',
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
    //console.log(data)
  });
})

angularModule.controller('controllerGetProfileHobi', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: Global.devel_api_global+'/profil/siswa',
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
    //console.log(data)
  });
})

angularModule.controller('controllerGetProfileBahasa', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: Global.devel_api_global+'/profil/siswa',
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
    //console.log(data)
  });
})

angularModule.controller('controllerGetProfileKarya', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: Global.devel_api_global+'/profil/siswa',
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
    //console.log(data)
  });
})

//controllerGetProfileMedsos
angularModule.controller('controllerGetProfileMedsos', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: Global.devel_api_global+'/profil/siswa',
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
    //console.log(data)
  });
})

angularModule.controller('controllerGetProfileSiswa', function($scope, $http, $window){
  var username = $('#hidden-username').text()
  var access_token = $('#hidden-access-token').text()

  //Request data profil
  var reqProfil = {
             method: 'POST',
             url: Global.devel_api_global+'/profil/siswa',
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
    //console.log(data)
  });
})

angularModule.controller('controllerAllMapel', function($scope, $http, $window){
  //Request daftar mapel
  var reqMapel = {
             method: 'GET',
             url: Global.devel_api_global+'/mapel',
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

    $scope.paraMapel = response.data.data
    // $scope.nama_lengkap = response.data.data[0].profil.nama_lengkap
    // $scope.foto = response.data.data[0].profil.foto
    // $scope.bio = response.data.data[0].profil.bio

  }, function(data){
    //console.log(data)
  });

  //Request daftar materi berdasarkan mapel
  $('#mapel').change(function() {

    var selectIdMapel = $(this).val()
    //alert('Id mapel yg diambil:'+selectIdMapel)

    var reqMateri = {
               method: 'POST',
               url: Global.devel_api_global+'/mapel/materi',
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

      $scope.paraMateri = response.data.data[0].materi

    }, function(data){
      console.log(data)
    });
  })
})

angularModule.controller('controllerAllGuru', function($scope, $http, $window){
  //Request daftar guru
  var reqGuru = {
             method: 'POST',
             url: Global.devel_api_global+'/pengguna/guru/sekolah',
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
  //Request daftar siswa
  var reqSiswa = {
             method: 'POST',
             url: Global.devel_api_global+'/pengguna/siswa/sekolah',
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

  //Request daftar mapel
  var reqMapel = {
             method: 'POST',
             url: Global.devel_api_portal+'/kegiatan/kategori',
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
    $scope.categories = response.data.data
  }, function(data){
    console.log(data)
  });
})



angularModule.controller('controllerGetTimeline', function($scope, $http, $window){
  var access_token = $('#hidden-access-token').text()
  var pengguna = $('#hidden-pengguna').text()

  //Request data timeline
  var reqTimeline = {
             method: 'POST',
             url: Global.devel_api_portal+'/kegiatan/daftar_semua',
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
                          'file_berkas' : data[i].file_berkas,
                          'pengguna': data[i].pengguna._id,
                          'kegiatan': data[i]._id,
                          'komentar': data[i].komentar,
                          'suka': data[i].suka
                        })
    }
    $scope.timelines = daftarTimeline
  }, function(data){
    //console.log('Data timeline: '+data)
  });

  $scope.muatUlangKomentar = function(keyEvent){
    if (keyEvent.which === 13){
      //Muat ulang kegiatan

      $http(reqTimeline).then(function(response){
        var data = response.data.data
        var banyakData = data.length
        console.log('Data timeline:'+JSON.stringify(data))
        var daftarTimeline = []

        for(var i = 0; i < banyakData; i++){
            daftarTimeline.push({
                              'username' : data[i].pengguna.profil.username,
                              'foto' : data[i].pengguna.profil.foto,
                              'created_at' : moment(data[i].created_at).fromNow(),
                              'judul' : data[i].judul,
                              'kategori' : data[i].kategori.nama_kategori,
                              'file_berkas' : data[i].file_berkas,
                              'pengguna': data[i].pengguna._id,
                              'kegiatan': data[i]._id,
                              'komentar': data[i].komentar,
                              'suka': data[i].suka
                            })
        }
        $scope.timelines = daftarTimeline
      }, function(data){
        //console.log('Data timeline: '+data)
        $scope.$applyAsync()
      });

    }
  }

  $scope.muatUlangKomentarSuka = function(){

      $http(reqTimeline).then(function(response){

        var data = response.data.data
        var banyakData = data.length
        console.log('Data timeline:'+JSON.stringify(data))
        var daftarTimeline = []

        for(var i = 0; i < banyakData; i++){
            daftarTimeline.push({
                              'username' : data[i].pengguna.profil.username,
                              'foto' : data[i].pengguna.profil.foto,
                              'created_at' : moment(data[i].created_at).fromNow(),
                              'judul' : data[i].judul,
                              'kategori' : data[i].kategori.nama_kategori,
                              'file_berkas' : data[i].file_berkas,
                              'pengguna': data[i].pengguna._id,
                              'kegiatan': data[i]._id,
                              'komentar': data[i].komentar,
                              'suka': data[i].suka
                            })
        }
        $scope.timelines = daftarTimeline
      }, function(data){
        //console.log('Data timeline: '+data)
        $scope.$applyAsync()
      });
  }

})

angularModule.controller('controllerDaftarPenyuka', function($scope, $http){
  var access_token = $('#hidden-access-token').text()

  $scope.daftarPenyukaQuery= function(item) {
    var idKegiatan = item.currentTarget.getAttribute("kegiatan")
    //console.log("kegiatannya: "+idKegiatan)
    var reqPenyukaKegiatan = {
               method: 'POST',
               url: Global.devel_api_portal+'/kegiatan/suka/daftar',
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
                       kegiatan: idKegiatan
                     }
              }

    $http(reqPenyukaKegiatan).then(function(response){

      var data = response.data.dataPenyuka
      var banyakData = data.length

      var daftarPenyuka = []

      for(var i = 0; i < banyakData; i++){
          daftarPenyuka.push({
            'namaPengguna' : data[i].pengguna.profil.username,
            'fotoPengguna' : data[i].pengguna.profil.foto,
            'waktuSuka' : data[i].keterangan
          })
      }
      console.log("Daftar Penyuka: "+JSON.stringify(daftarPenyuka))
      $scope.daftarPenyukaResult = daftarPenyuka
    }, function(data){
      console.log(data)
    });
  };
})

angularModule.controller('controllerKegiatanku', function($scope, $http, $window){
  var access_token = $('#hidden-access-token').text()
  var user_id = $('#hidden-user-id').text()

  //Request data timeline
  var reqKegiatanku = {
             method: 'POST',
             url: Global.devel_api_portal+'/kegiatan/daftar_per_pengguna',
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

  //Request data timeline
  var reqAbsensi = {
             method: 'POST',
             url: Global.devel_api_portal+'/absensi/daftar_per_pengguna',
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

  var access_token = $('#hidden-access-token').text()
  var id_sekolah = $('#hidden-id-sekolah').text()
  console.log('akses token get kelas:'+access_token)
  console.log('id sekolah get kelas:'+id_sekolah)
  //Request daftar kelas
  var reqKelas = {
             method: 'POST',
             url: Global.devel_api_global+'/daftar_kelas',
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

  var access_token = $('#hidden-access-token').text()
  var id_kelas = $('#hidden-id-kelas').text()

  //Request daftar siswa dalam kelas
  var reqKelas = {
             method: 'POST',
             url: Global.devel_api_global+'/daftar_kelas/siswa',
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

    $scope.students = response.data.data
    // $scope.nama_lengkap = response.data.data[0].profil.nama_lengkap
    // $scope.foto = response.data.data[0].profil.foto
    // $scope.bio = response.data.data[0].profil.bio
  }, function(data){
    console.log(data)
  });
})

angularModule.controller('controllerGetKelasPunyaGuru', function($scope, $http, $window){
  var access_token = $('#hidden-access-token').text()
  var id_pengguna = $('#hidden-access-user-id').text()
  //Request daftar kelas berdasarkan guru
  var reqKelas = {
             method: 'POST',
             url: Global.devel_api_global+'/daftar_kelas/guru',
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

  var access_token = $('#hidden-access-token').text()
  var id_kelas = $('.idKelas').text()

  console.log('akses token get detail kelas:'+access_token)
  console.log('id kelas get detail:'+id_kelas)

  //Request detail kelas
  var reqKelas = {
             method: 'POST',
             url: Global.devel_api_global+'/daftar_kelas/detail',
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
