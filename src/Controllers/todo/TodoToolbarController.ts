/// <reference path="../../../typings/index.d.ts" />
import FilterService = require('../../Services/todo/FilterService');
import TodosService = require('../../Services/todo/TodosService')

class TodoToolbarController {
    filterService: FilterService;
    $scope: ng.IScope;
    todosService: TodosService;

    allCount: number;
    doneCount: number;
    remainingCount: number;

    constructor($scope: ng.IScope, todosService: TodosService, filterService: FilterService) {

        // リスト変更イベントの設定
        $scope.$on('change:list', (evt, list) => {
            this.calFilterBatch(list);
        });

        this.$scope = $scope;
        this.todosService = todosService;
        this.filterService = filterService;
        this.allCount = 0;
        this.doneCount = 0;
        this.remainingCount = 0;

        TodoToolbarController.$inject = ['$scope', 'todosService', 'filterService'];
    }

    getCurrentFilter() {
        return this.filterService.getCurrentFilter();
    }

    getDone() {
        return this.todosService.getDone();
    }

    getRemaining() {
        return this.todosService.getRemaining();
    }

    checkAll(): void {
        this.todosService.changeState(!!this.remainingCount);
    }

    changeFilter(filter): void {
        this.filterService.changeFilter(filter);
    }

    removeDoneTodo(): void {
        this.todosService.removeDone();
    }

    calFilterBatch(list) {
        var length = list.length;
        var doneCount = this.todosService.getDoneTodos().length;

        this.allCount = length;
        this.doneCount = doneCount;
        this.remainingCount = length - doneCount;
    }
}
export = TodoToolbarController;
