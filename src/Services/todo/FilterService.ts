/// <reference path="../../../typings/index.d.ts" />

class FilterService {
    private scope: ng.IScope;
    private currentFilter;

    constructor($rootScope) {
        this.scope = $rootScope;
        FilterService.$inject = ['$rootScope'];
    }

    getCurrentFilter() {
        return this.currentFilter;
    }

    setCurrentFilter(filter) {
        this.currentFilter = filter;
    }

    changeFilter(filter) {
        this.currentFilter = filter;
        this.scope.$broadcast('change:filter', filter);
    }
}
export = FilterService;
