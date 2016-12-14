
/// <reference path="../../../typings/index.d.ts" />
import TodoItem = require('../../models/todo/TodoItem');

class TodoModalEditController {
    private $scope: ng.IScope;
    private $uibModalInstance;

    private item: TodoItem;
    private editedItem: TodoItem;

    private dateOptions;
    private popupState;
    private altInputFormats

    constructor($scope, $uibModalInstance, item: TodoItem) {
        this.$scope = $scope;
        this.$uibModalInstance = $uibModalInstance;

        this.item = item;
        this.editedItem = {
            id: item.id,
            title: item.title,
            complated: item.complated,
            deadline: item.deadline
        };
        this.dateOptions = {
            dateDisabled: this.disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 12, 31),
            minDate: new Date(),
            startingDay: 1
        };
        this.popupState = {
            opened: false
        }
        this.altInputFormats = ['M!/d!/yyyy'];

        TodoModalEditController.$inject = ['$scope', '$uibModalInstance', 'item'];
    }

    openDatePicker() {
        this.popupState.opened = true;
    }

    disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    ok() {
        this.item = this.editedItem
        this.$uibModalInstance.close(this.editedItem);
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}
export = TodoModalEditController;
