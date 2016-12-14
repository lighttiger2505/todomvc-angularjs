
/// <reference path="../../../typings/index.d.ts" />
import TodosService = require("../../Services/todo/TodosService");

class TodoRegisterController {
    private $scope: ng.IScope;
    private todosServie: TodosService;

    private newTitle: string;

    constructor($scope: ng.IScope, todosService: TodosService) {
        this.$scope = $scope;
        this.todosServie = todosService;
        this.newTitle = '';

        TodoRegisterController.$inject = ['$scope', 'todosService'];
    }

    addTodo() {
        this.todosServie.add(this.newTitle);
        this.newTitle = '';
    }
}
export = TodoRegisterController;
