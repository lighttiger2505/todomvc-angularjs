/// <reference path="../../../typings/index.d.ts" />

import TodoItem = require("../../Models/todo/TodoItem")

class TodosService {
    private $scope: ng.IScope;
    private filter;

    private list: TodoItem[];
    private filterFilter;
    private complated;
    private remaining;

    constructor($rootScope, $filter) {

        // イベント定義
        $rootScope.$watch(() => {
            return this.list;
        }, (value) => {
            $rootScope.$broadcast('change:list', value);
        }, true);

        // 初期値設定
        this.$scope = $rootScope;
        this.list = [];
        this.filterFilter = $filter('filter');

        this.complated = {
            complated: true
        };
        this.remaining = {
            complated: false
        };
        this.filter = {
            complated: this.complated,
            remaining: this.remaining
        };

        this.add("とうどう１")
        this.add("とうどう２")
        this.add("とうどう３")

        // DI
        TodosService.$inject = ['$rootScope', '$filter'];
    }

    getDone() {
        return this.complated;
    }

    getRemaining() {
        return this.remaining;
    }

    getFilter() {
        return this.filter;
    }

    getDoneTodos() {
        return this.filterFilter(this.list, this.complated);
    };

    getTodos() {
        return this.list;
    }

    add(title: string) {
        this.list.push({
            id: this.uniqueId(),
            title: title,
            complated: false,
            deadline: new Date()
        });
    }

    remove(currentTodo) {
        this.list = this.filterFilter(this.list, function(todo) {
            return currentTodo !== todo;
        });
    }

    edit(editedItem: TodoItem) {
        let filterResult: TodoItem[] = this.filterFilter(this.list, function(todo) {
            return editedItem.id == todo.id;
        });
        let item: TodoItem = filterResult[0];
        item.title = editedItem.title;
        item.deadline = editedItem.deadline
    }

    removeDone() {
        this.list = this.filterFilter(this.list, this.remaining);
    }
    uniqueId(): string {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    };

    changeState(state) {
        angular.forEach(this.list, function(todo: TodoItem) {
            todo.complated = state;
        });
    }
}
export = TodosService;
