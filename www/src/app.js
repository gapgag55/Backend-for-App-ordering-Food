var app = angular.module('food', ['ngRoute']);

// AddCtrl ===========================================

app.controller('AddCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.order = {
    	food: [],
    };

    $scope.addorder = function() {

    	if($scope.toyum){
    		$scope.order.food.push("ต้มยำกุ้ง");
    	}
    	if($scope.kapao){
    		$scope.order.food.push("กระเพราปลาหมึก");
    	}
    	if($scope.kaidao){
    		$scope.order.food.push("ไข่ดาว");
    	}
    	if($scope.kapaopa){
    		$scope.order.food.push("กระเพราะปลา");
    	}
    	
    	console.log($scope.order.food);

        $http.post('/neworder', $scope.order).success(function(data) {
            $scope.order = {};
            console.log(data);
            $location.path('/');
        });
    }
}]);

// ListCtrl ==========================================

app.controller('ListCtrl', ['$scope', '$http', '$route', function($scope, $http, $route) {
    $http.get('/order').success(function(data) {
        console.log(data);
        $scope.menus = data;
    });

    $scope.finish = function(index) {
    	console.log(index);

        $http.put('/finish/' + index).success(function(data) {
            console.log(data);
        });
        $route.reload();

    }
}]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/list.html',
            controller: 'ListCtrl'
        })
        .when('/neworder', {
            templateUrl: 'views/add.html',
            controller: 'AddCtrl'
        });

    $locationProvider.html5Mode(true);
});
