var angularModule = angular.module('vidyanusaApp',[])
const Global = {
  "api_global" : "http://apigeneraldev.vidyanusa.id",
  "api_portal" : "http://apiportaldev.vidyanusa.id"
};

angularModule.controller('controllerDaftar', function($scope){
  $scope.default = "true"
  $scope.siswa = "false"
  $scope.guru = "false"

  $scope.default_view = function(){
    $scope.default = "true"
    $scope.siswa = "false"
    $scope.guru = "false"
  }

  $scope.siswa_view = function(){
    $scope.default = "false"
    $scope.siswa = "true"
    $scope.guru = "false"
  }

  $scope.guru_view = function(){
    $scope.default = "false"
    $scope.siswa = "false"
    $scope.guru = "true"
  }

})

angularModule.controller('controllerAmbilDaftarSekolah', function($scope, $http){
      $http({
        method: 'POST',
        url: Global.api_global+'/daftar_sekolah'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.schools = response.data.data;
          console.log("Daftar sekolah: "+JSON.stringify(response.data.data))
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log("Gagal mengambil data ke server")
      });
})

angularModule.controller('controllerDaftarSekolah', function ($scope, $http) {
  $http({
        method: 'GET',
        url: Global.api_global+'/daftar_sekolah'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $scope.schools = response.data.data;
          console.log("Daftar sekolah: "+JSON.stringify(response.data.data))
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log("Gagal mengambil data ke server")
      });
})
