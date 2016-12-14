class TodoItem {
    constructor(
        public id: string,
        public title: string,
        public complated: boolean,
        public deadline: Date
    ) {
        this.id = '';
        this.title = '';
        this.complated = false;
        this.deadline = new Date();
    }
}
export = TodoItem;
