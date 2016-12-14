/// <reference path="../../../typings/index.d.ts" />
import TodoModalEditController = require('./TodoModalEditController');
import TodoItem = require('../../models/todo/TodoItem');
import TodosService = require('../../Services/todo/TodosService');

class TodoModalController {
    private $scope: ng.IScope;
    private $uibModal;
    private $log;

    private todosService;
    private modalInstance;

    constructor($scope, $uibModal, $log, todosService: TodosService) {
        this.$scope = $scope;
        this.$uibModal = $uibModal;
        this.$log = $log;
        this.todosService = todosService;

        TodoModalController.$inject = ['$scope', '$uibModal', '$log', 'todosService'];

    }

    open(item: TodoItem) {
        this.modalInstance = this.$uibModal.open({
            animation: true,
            templateUrl: '../../Delectives/todo/TodoModalEdit.html',
            controller: TodoModalEditController,
            controllerAs: 'edit',
            size: 'lg',
            resolve: {
                item: item
            }
        });

        this.modalInstance.result.then((editedItem: TodoItem) => {
            this.todosService.edit(editedItem);
        }, () => {
            this.$log.info('Modal dismissed at: ' + new Date());
        });
    }
}
export = TodoModalController;
