var myApp = angular.module('demo',[]);
myApp.controller('AppCtrl', function($scope, $http) {
 	console.log("Hello world from controller"); 


var refresh = function()
{
 	$http.get('/relish').then(function (response){
 		console.log("I got the data");
 		$scope.recipelist=response;
 		$scope.recipe=null;
 		console.log("refreshed")
 	});  
};

refresh(); 	


$scope.search = function(){
console.log($scope.recipe.name);
$http.get('/relish/' + $scope.recipe.name).then(function(response){
console.log(response.data);
$scope.recipelist=response;
$scope.recipe=null;
});
};
	
});

