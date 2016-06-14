//chirpApp.js
var app = angular.module('chirpApp', ['ngRoute', 'ngResource']).run(function($rootScope, $http) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	
	$rootScope.logout = function(){
		$http.get('/auth/sigout');
		$rootScope.authenticated = false;
		$rootScope.current_user = '';
	};
});

app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: 'main.html',
      controller: 'mainController'
    })
    //the login display
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    });
});


app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
});



app.controller('mainController', function($rootScope, $scope, postService){
	$scope.posts = postService.query();
	$scope.newPost = {created_by:'', text:'', created_at:''};
	
	$scope.post = function(){
		$scope.newPost.created_by = $rootScope.current_user;
		$scope.newPost.created_at = Date.now();
		postService.save($scope.newPost, function(){
			$scope.posts = postService.query();
			$scope.newPost = {created_by:'', text:'', created_at:''};
		});
	};
	
	$scope.removePost = function(index){
		var deletingPost = $scope.posts.splice(index, 1);//removing from client side
		
		console.log("TODO remove from db");
		postService.delete(deletingPost, function(){
			//$scope.posts = postService.query();
		});
		
		
	};
	
});

app.controller('authController', function($scope, $http, $rootScope, $location){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
		$http.post('/auth/login', $scope.user).success(function(data){
			$rootScope.authenticated = true;
			$rootScope.current_user = data.user.username;
			$location.path('/');
		});
		//placeholder until authentication is implemented
		$scope.error_message = 'login request for ' + $scope.user.username;
	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.user).success(function(data){
			$rootScope.authenticated = true;
			$rootScope.current_user = data.user.username;
			$location.path('/');
		});		
		//placeholder until authentication is implemented
		$scope.error_message = 'registeration request for ' + $scope.user.username;
	};
});