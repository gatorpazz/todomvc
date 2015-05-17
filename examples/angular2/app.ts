/// <reference path="typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap, For, If} from 'angular2/angular2';
import {TodoStore, Todo} from 'services/store';

@Component({
	selector: 'todo-app',
	injectables: [
		TodoStore
	]
})
@View({
	directives: [For, If],
	template: `
		<section id="todoapp">
			<header id="header">
				<h1>todos</h1>
				<input id="new-todo" placeholder="What needs to be done?" autofocus="" #newtodo (keyup)="addTodo($event, newtodo)">
			</header>
			<section id="main" *If="todoStore.todos.length > 0">
				<input id="toggle-all" type="checkbox" *If="todoStore.todos.length" #toggleall [checked]="todoStore.allCompleted()" (click)="todoStore.setAllTo(toggleall)">
				<ul id="todo-list">
					<li *for="#todo of todoStore.todos" [class.completed]="todo.completed" [class.editing]="todo.editing">
						<div class="view">
							<input class="toggle" type="checkbox" (click)="toggleCompletion(todo.uid)" [checked]="todo.completed">
							<label (dblclick)="editTodo(todo)">{{todo.text}}</label>
							<button class="destroy" (click)="remove(todo.uid)"></button>
						</div>
						<input class='edit' *If="todo.editing" [value]="todo.text" #editedtodo (blur)="stopEditing(todo, editedtodo)" (keyUp)="updateEditingTodo($event, editedtodo, todo)"/>
					</li>
				</ul>
			</section>
			<footer id="footer" *If="todoStore.todos.length > 0">
				<span id="todo-count"><strong>{{todoStore.getRemaining().length}}</strong> {{todoStore.getRemaining().length == 1 ? 'item' : 'items'}} left</span>
				<button id="clear-completed" *If="todoStore.getCompleted().length > 0" (click)="removeCompleted()">Clear completed</button>
			</footer>
		</section>`
})
class TodoApp {
	todoStore: TodoStore;
	constructor(todoStore:TodoStore) {
		this.todoStore = todoStore;
	}
	getToggleAllValue() {
		return this.todoStore.allCompleted() ? 'on' : 'off';
	}
	stopEditing(todo:Todo, editedTitle) {
		todo.setText(editedTitle.value);
		todo.editing = false;
	}
	updateEditingTodo($event, editedText, todo:Todo) {
		if ($event.which == 13) {
			todo.editing = false;

			if (todo.setText(editedText.value) == false) {
				this.todoStore.remove(todo.uid);
			}
		}

		if ($event.which == 27) {
			todo.editing = false;
		}
	}
	editTodo(todo:Todo) {
		todo.editing = true;
	}
	removeCompleted() {
		this.todoStore.removeCompleted();
	}
	toggleCompletion(uid:String) {
		this.todoStore.toggleCompletion(uid);
	}
	remove(uid:String){
		this.todoStore.remove(uid);
	}
	addTodo($event, newtodo) {
		if ($event.which == 13 && newtodo.value.length) {
			this.todoStore.add(newtodo.value);
			newtodo.value = '';
		}
	}
}

bootstrap(TodoApp);
