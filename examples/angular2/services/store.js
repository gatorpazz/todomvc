//http://stackoverflow.com/questions/105035/create-guid-uuid-in-javascript
function generateUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
var Todo = (function () {
    function Todo(text) {
        this.uid = generateUID();
        this.completed = false;
        this.editing = false;
        this.text = this.cleanText(text);
    }
    Todo.prototype.cleanText = function (text) {
        return text.replace(/\W+$/, '');
    };
    Todo.prototype.setText = function (text) {
        this.text = this.cleanText(text);
        if (this.text.length == 0) {
            return false;
        }
    };
    return Todo;
})();
exports.Todo = Todo;
var TodoStore = (function () {
    function TodoStore() {
        this.todos = (store.get('angular2-todos') || []);
    }
    TodoStore.prototype._updateStore = function () {
        store.set('angular2-todos', this.todos);
    };
    TodoStore.prototype.get = function (completed) {
        return this.todos.filter(function (todo) {
            return todo.completed == completed;
        });
    };
    TodoStore.prototype.allCompleted = function () {
        return this.todos.length == this.getCompleted().length;
    };
    TodoStore.prototype.setAllTo = function (toggler) {
        this.todos.forEach(function (t) { return t.completed = toggler.checked; });
        this._updateStore();
    };
    TodoStore.prototype.removeCompleted = function () {
        this.todos = this.get(false);
    };
    TodoStore.prototype.getRemaining = function () {
        return this.get(false);
    };
    TodoStore.prototype.getCompleted = function () {
        return this.get(true);
    };
    TodoStore.prototype.toggleCompletion = function (uid) {
        this.todos.some(function (todo) {
            if (todo.uid == uid) {
                todo.completed = !todo.completed;
                return true;
            }
        });
        this._updateStore();
    };
    TodoStore.prototype.remove = function (uid) {
        this.todos.some(function (todo, i) {
            if (todo.uid == uid) {
                this.todos.splice(i, 1);
                return true;
            }
        }.bind(this));
        this._updateStore();
    };
    TodoStore.prototype.add = function (text) {
        this.todos.push(new Todo(text));
        this._updateStore();
    };
    return TodoStore;
})();
exports.TodoStore = TodoStore;
