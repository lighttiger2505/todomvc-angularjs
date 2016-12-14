/// <reference path="../../../typings/index.d.ts" />
import TodosService = require("../../Services/todo/TodosService");
import FilterService = require("../../Services/todo/FilterService");
import TodoItem = require("../../models/todo/TodoItem");

class TodoListController {
    private $scope: ng.IScope;
    private todosService: TodosService;
    private filterService: FilterService;

    private originalTitle: string;
    private editing;

    constructor($scope: ng.IScope, todosService: TodosService, filterService: FilterService) {
        this.$scope = $scope;
        this.todosService = todosService;
        this.filterService = filterService;

        this.originalTitle = '';
        this.editing = null;

        TodoListController.$inject = ['$scope', 'todosService', 'filterService'];
    }

    editTodo(todo) {
        this.originalTitle = todo.title;
        this.editing = todo;
    }

    doneEdit(todoForm) {
        if (todoForm.$invalid) {
            this.editing.title = this.originalTitle;
        }
        this.editing = this.originalTitle = null;
    }

    removeTodo(todo: TodoItem) {
        this.todosService.remove(todo);
    }
}
export = TodoListController;
