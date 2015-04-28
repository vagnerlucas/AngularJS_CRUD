angular.module('main', ['ngRoute', 'ui.bootstrap'])

//Routes | Rotas
.config(function($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl : 'pages/about-helper.html'//,
            })

            .when('/contacts/add', {
                 templateUrl : 'pages/contacts.html'
            })

            .when('/contacts/list', {
                 templateUrl : 'pages/contacts-list.html'
            })
            
            .when('/categories/add', {
                 templateUrl : 'pages/categories.html'
            })

            .when('/categories/list', {
                 templateUrl : 'pages/categories-list.html'
            })
    });