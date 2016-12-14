/// <reference path="../../../typings/index.d.ts" />

'use strict';
export function view2Module(): ng.IModule {
    var app = angular.module('myApp.view2', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/view2', {
                templateUrl: '../../Delectives/view2/view2.html',
                controller: 'View2Ctrl'
            });
        }])
        .controller('View2Ctrl', function($scope) {
            $scope.test = 'hello world';
        });
    return app;
}
