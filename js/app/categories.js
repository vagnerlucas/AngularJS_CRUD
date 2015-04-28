angular.module('main').controller('newCategory', function($scope, $window, $http, $route) {

  $scope.saved = localStorage.getItem('categories');

  $scope.categories = ($scope.saved !== null) ? JSON.parse($scope.saved) :
  	$http.get('/data/categories.json').success(function(data){
  		$scope.categories = data;
  	}).
  	error(function(){
  		$window.alert('erro ao carregar categorias');
  	});

  $scope.save = function() {

  	$scope.categories.push({
  		name: $scope.categories.name
  	});

	 localStorage.setItem('categories', JSON.stringify($scope.categories));

	 $route.reload();

  };
})

.controller('categoryList', function($scope, $http, $window, $modal) {

  $scope.saved = localStorage.getItem('categories');

  $scope.categories = ($scope.saved !== null) ? JSON.parse($scope.saved) :
  	$http.get('/data/categories.json').success(function(data){
  		$scope.categories = data;
  	}).
  	error(function(){
  		$window.alert('erro ao carregar categorias');
  	});


  	$scope.edit = function(index) {

  		$modal.open({ 
  			templateUrl: 'pages/category-edit.html',
  			backdrop: true,
  			windowClass: 'modal',
        scope: $scope,
  			controller: function($scope, $modalInstance) {
        
        $scope.name = $scope.categories[index].name;

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };

        $scope.submit = function(newCategoryName) {
            $scope.categories[index].name = newCategoryName;
            localStorage.setItem('categories', JSON.stringify($scope.categories));
            $modalInstance.dismiss('submitted');           
          }
       }
  		});
  	};

  	$scope.remove = function(index) {
      
      $modal.open({ 
        templateUrl: 'pages/category-delete.html',
        backdrop: true,
        windowClass: 'modal',
        scope: $scope,
        controller: function($scope, $modalInstance) {
        
        $scope.name = $scope.categories[index].name;

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };

        $scope.submit = function() {
            $scope.categories.splice(index, 1);
            localStorage.setItem('categories', JSON.stringify($scope.categories));
            $modalInstance.dismiss('submitted');           
          }
       }
      });  
  	};

});