'use strict';
var app = angular.module("DealerApp", []);
app.constant("baseURL", "http://localhost:3000/")
   .service('myService', ['$http', 'baseURL', function($http, baseURL){
    this.getCards = function(){
        return $http.get(baseURL+"cards");
    };
    this.getAve = function(){
        return $http.get(baseURL+"avepoint");
    };  
}]);
app.controller("mainCtrl", function($scope, myService) {
    $scope.getShuffle = function(){
        myService.getCards().then(
            function(response){
                $scope.cards = response.data['cardArr'];
                $scope.mypoint = response.data['percentage'];
                myService.getAve().then(
                    function(res){
                        $scope.avepoint = res.data;
                    }
                );
            }
        );
    }
    $scope.getShuffle();
});