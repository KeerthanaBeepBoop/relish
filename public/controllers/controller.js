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
$scope.addRecipe=function(){
      console.log($scope.recipe);
      $http.post('/relish',$scope.recipe).then(function(response){

      refresh();
      });
 	};

$scope.remove = function(name){
console.log(name);
$http.delete('/relish/' + name).then(function(response){
refresh();
});
};

$scope.edit = function(id){
console.log(id);
$http.get('/relish/edit/' + id).then(function(response){
console.log(response.data);
$scope.recipe=response.data;
});
};
 	
$scope.update = function(){
	console.log($scope.recipe._id); 
	$http.put('/relish/'+ $scope.recipe._id,$scope.recipe).then(function(response){
    refresh();
	});
};





$scope.deselect = function(){
   $scope.recipe=null;

};	
 });

