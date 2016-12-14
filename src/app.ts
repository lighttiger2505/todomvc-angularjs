
'use strict';

/// <reference path="../../../typings/index.d.ts" />

import todo = require("./Controllers/todo/Todo");
import view2 = require("./Controllers/view2/view2");

angular.module('myApp', [
    'ngRoute',
    todo.default,
    'myApp.view2'
]).
    config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({ redirectTo: '/todo' });
    }]);

var app2 = view2.view2Module();
