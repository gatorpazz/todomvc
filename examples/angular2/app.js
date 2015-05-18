if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="typings/angular2/angular2.d.ts" />
var angular2_1 = require('angular2/angular2');
var store_1 = require('services/store');
var TodoApp = (function () {
    function TodoApp(todoStore) {
        this.todoStore = todoStore;
    }
    TodoApp.prototype.getToggleAllValue = function () {
        return this.todoStore.allCompleted() ? 'on' : 'off';
    };
    TodoApp.prototype.stopEditing = function (todo, editedTitle) {
        todo.setText(editedTitle.value);
        todo.editing = false;
    };
    TodoApp.prototype.updateEditingTodo = function ($event, editedText, todo) {
        if ($event.which == 13) {
            todo.editing = false;
            if (todo.setText(editedText.value) == false) {
                this.todoStore.remove(todo.uid);
            }
        }
        if ($event.which == 27) {
            todo.editing = false;
        }
    };
    TodoApp.prototype.editTodo = function (todo) {
        todo.editing = true;
    };
    TodoApp.prototype.removeCompleted = function () {
        this.todoStore.removeCompleted();
    };
    TodoApp.prototype.toggleCompletion = function (uid) {
        this.todoStore.toggleCompletion(uid);
    };
    TodoApp.prototype.remove = function (uid) {
        this.todoStore.remove(uid);
    };
    TodoApp.prototype.addTodo = function ($event, newtodo) {
        if ($event.which == 13 && newtodo.value.length) {
            this.todoStore.add(newtodo.value);
            newtodo.value = '';
        }
    };
    TodoApp = __decorate([
        angular2_1.Component({
            selector: 'todo-app',
            injectables: [
                store_1.TodoStore
            ]
        }),
        angular2_1.View({
            directives: [angular2_1.For, angular2_1.If],
            template: "\n\t\t<section id=\"todoapp\">\n\t\t\t<header id=\"header\">\n\t\t\t\t<h1>todos</h1>\n\t\t\t\t<input id=\"new-todo\" placeholder=\"What needs to be done?\" autofocus=\"\" #newtodo (keyup)=\"addTodo($event, newtodo)\">\n\t\t\t</header>\n\t\t\t<section id=\"main\" *If=\"todoStore.todos.length > 0\">\n\t\t\t\t<input id=\"toggle-all\" type=\"checkbox\" *If=\"todoStore.todos.length\" #toggleall [checked]=\"todoStore.allCompleted()\" (click)=\"todoStore.setAllTo(toggleall)\">\n\t\t\t\t<ul id=\"todo-list\">\n\t\t\t\t\t<li *for=\"#todo of todoStore.todos\" [class.completed]=\"todo.completed\" [class.editing]=\"todo.editing\">\n\t\t\t\t\t\t<div class=\"view\">\n\t\t\t\t\t\t\t<input class=\"toggle\" type=\"checkbox\" (click)=\"toggleCompletion(todo.uid)\" [checked]=\"todo.completed\">\n\t\t\t\t\t\t\t<label (dblclick)=\"editTodo(todo)\">{{todo.text}}</label>\n\t\t\t\t\t\t\t<button class=\"destroy\" (click)=\"remove(todo.uid)\"></button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<input class='edit' *If=\"todo.editing\" [value]=\"todo.text\" #editedtodo (blur)=\"stopEditing(todo, editedtodo)\" (keyUp)=\"updateEditingTodo($event, editedtodo, todo)\"/>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</section>\n\t\t\t<footer id=\"footer\" *If=\"todoStore.todos.length > 0\">\n\t\t\t\t<span id=\"todo-count\"><strong>{{todoStore.getRemaining().length}}</strong> {{todoStore.getRemaining().length == 1 ? 'item' : 'items'}} left</span>\n\t\t\t\t<button id=\"clear-completed\" *If=\"todoStore.getCompleted().length > 0\" (click)=\"removeCompleted()\">Clear completed</button>\n\t\t\t</footer>\n\t\t</section>"
        }), 
        __metadata('design:paramtypes', [store_1.TodoStore])
    ], TodoApp);
    return TodoApp;
})();
angular2_1.bootstrap(TodoApp);
