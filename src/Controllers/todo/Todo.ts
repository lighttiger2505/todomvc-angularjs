/// <reference path="../../../typings/index.d.ts" />
import FilterService = require('../../Services/todo/FilterService');
import TodosService = require("../../Services/todo/TodosService");
import TodoRegisterController = require('./TodoRegisterController');
import TodoToolbarController = require('./TodoToolbarController');
import TodoListController = require('./TodoListController');
import TodoModalController = require('./TodoModalController');
import TodoModalEditController = require('./TodoModalEditController');

function todoRegisterDDO(): ng.IDirective {
    return {
        restrict: 'E',
        controller: TodoRegisterController,
        controllerAs: 'registerCtrl',
        scope: {},
        templateUrl: '../../Delectives/todo/TodoRegister.html'
    };
}

function todoToolbarDDO(): ng.IDirective {
    return {
        restrict: 'E',
        controller: TodoToolbarController,
        controllerAs: 'toolbarCtrl',
        scope: {},
        templateUrl: '../../Delectives/todo/TodoToolbar.html'
    };
}

function todoListDDO(): ng.IDirective {
    return {
        restrict: 'E',
        controller: TodoListController,
        controllerAs: 'listCtrl',
        scope: {},
        templateUrl: '../../Delectives/todo/TodoTable.html'
    };
}

function todoModalDDO(): ng.IDirective {
    return {
        restrict: 'E',
        controller: TodoModalController,
        controllerAs: 'modalCtrl',
        scope: {
            item: '=item'
        },
        templateUrl: '../../Delectives/todo/TodoModal.html'
    };
}

angular.module('todo', ['ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider', ($routeProvider) => {
        $routeProvider.when('/todo', {
            templateUrl: '../../Delectives/todo/Todo.html',
        });
    }])
    .service('filterService', FilterService)
    .service('todosService', TodosService)
    .controller('TodoModalEditController', TodoModalEditController)
    .directive('tdRegister', todoRegisterDDO)
    .directive('tdToolbar', todoToolbarDDO)
    .directive('tdList', todoListDDO)
    .directive('tdModal', todoModalDDO);

export default 'todo'
