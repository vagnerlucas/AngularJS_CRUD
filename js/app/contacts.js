angular.module('ui.bootstrap').controller('newContactCtrl', function ($scope, $window, $http, $route) {
  
  $scope.saved = localStorage.getItem('contacts');

  $scope.savedCategories = [];

  $scope.contacts = ($scope.saved !== null) ? JSON.parse($scope.saved) :
  	$scope.contacts = []; 

  $scope.catSaved = localStorage.getItem('categories');

  $scope.categories = ($scope.catSaved !== null) ? JSON.parse($scope.catSaved) :
    $http.get('/data/categories.json').success(function(data){
  		$scope.categories = data;
  	}).
  	error(function(){
  		$window.alert('erro ao carregar categorias');
  	});

  $scope.save = function() {

  	$scope.contacts.push({
  		firstname: $scope.contacts.firstname,
  		lastname: $scope.contacts.lastname,
  		homenumber: $scope.contacts.homenumber,
  		mobilenumber: $scope.contacts.mobilenumber,
  		email: $scope.contacts.email,
  		categories: $scope.savedCategories
  		});

	   localStorage.setItem('contacts', JSON.stringify($scope.contacts));

	   $route.reload();
    };
 
  $scope.addCategory = function(category){
    	$scope.savedCategories.push(category);
    	angular.element('#' + category.name).addClass('hidden');
    };

	$scope.removeCategory = function(index) {
		angular.element('#' + $scope.savedCategories[index].name).removeClass('hidden');
		$scope.savedCategories.splice(index, 1);
	};
    
})

.controller('contactsList', function($scope, $window, $http, $modal, $route) {

  $scope.saved = localStorage.getItem('contacts');
  $scope.contacts = ($scope.saved !== null) ? JSON.parse($scope.saved) : 
	  $http.get('/data/contacts.json').success(function(data){
  		$scope.contacts = data;
  	  }).
  	  error(function() {
	  	  $window.alert('erro ao carregar dados json');
	    });

    $scope.edit = function(index) {

      $modal.open({ 
        templateUrl: 'pages/contact-edit.html',
        backdrop: true,
        windowClass: 'modal',
        scope: $scope,
        controller: function($scope, $modalInstance) {
        
        var contacttmp = $scope.contacts[index]
        var savedContact = $scope.contacts[index];

        $scope.contact = contacttmp;

        $scope.savedCategories = $scope.contact.categories;

        $scope.catSaved = localStorage.getItem('categories');
        $scope.categories = ($scope.catSaved !== null) ? JSON.parse($scope.catSaved) :
        $http.get('/data/categories.json').success(function(data){
          $scope.categories = data;
        }).
        error(function() {
          $window.alert('erro ao carregar categorias');
        });

        $scope.addCategory = function(category){
          var c;
          for (c of $scope.savedCategories) {
            if (c.name === category.name) {
              angular.element('#' + category.name).addClass('hidden');
              return;    
            }
          }
          $scope.savedCategories.push(category);
          $scope.contact.categories = $scope.savedCategories;
          angular.element('#' + category.name).addClass('hidden');
        };

        $scope.removeCategory = function(index) {
          angular.element('#' + $scope.savedCategories[index].name).removeClass('hidden');
          $scope.savedCategories.splice(index, 1);
          $scope.contact.categories = $scope.savedCategories;
        };

        var name = $scope.contact.firstname;
        $scope.name = name;

        $scope.cancel = function() {
            $scope.contacts[index] = savedContact;
            $modalInstance.dismiss('cancel');
        };

        $scope.submit = function() {
            $scope.categories = $scope.savedCategories;
            localStorage.setItem('contacts', JSON.stringify($scope.contacts));
            $modalInstance.dismiss('submitted');  
        }
       }        //promise
      }).result.finally(function() { $route.reload(); });
    };

  $scope.remove = function(index) {
      
      $modal.open({ 
        templateUrl: 'pages/contact-delete.html',
        backdrop: true,
        windowClass: 'modal',
        scope: $scope,
        controller: function($scope, $modalInstance) {
        
        $scope.name = $scope.contacts[index].firstname;

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };

        $scope.submit = function() {
            $scope.contacts.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify($scope.contacts));
            $modalInstance.dismiss('submitted');           
          }
       }
      });  
    };
	
});