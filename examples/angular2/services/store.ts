//http://stackoverflow.com/questions/105035/create-guid-uuid-in-javascript

function generateUID () {
	function s4 () {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
}

export class Todo {
	completed: Boolean;
	editing: Boolean;
	text: String;
	uid: String;
	cleanText(text:String) {
		return text.replace(/\W+$/, '');
	}
	setText(text:String) {
		this.text = this.cleanText(text);

		if (this.text.length == 0) {
			return false;
		}
	}
	constructor(text:String) {
		this.uid = generateUID();
		this.completed = false;
		this.editing = false;
		this.text = this.cleanText(text);
	}
}

export class TodoStore {
	todos: Array<Todo>;
	constructor() {
		this.todos = (store.get('angular2-todos') || []);
	}
	_updateStore() {
		store.set('angular2-todos', this.todos);
	}
	get(completed:Boolean) {
		return this.todos.filter(function (todo) {
			return todo.completed == completed;
		});
	}
	allCompleted() {
		return this.todos.length == this.getCompleted().length;
	}
	setAllTo(toggler) {
		this.todos.forEach((t:Todo) => t.completed = toggler.checked);
		this._updateStore();
	}
	removeCompleted() {
		this.todos = this.get(false);
	}
	getRemaining() {
		return this.get(false);
	}
	getCompleted() {
		return this.get(true);
	}
	toggleCompletion(uid:String) {
		this.todos.some(function (todo) {
			if (todo.uid == uid) {
				todo.completed = !todo.completed;
				return true;
			}
		});
		this._updateStore();
	}
	remove(uid:String) {
		this.todos.some(function (todo, i) {
			if (todo.uid == uid) {
				this.todos.splice(i, 1);
				return true;
			}
		}.bind(this));
		this._updateStore();
	}
	add(text:String) {
		this.todos.push(new Todo(text));
		this._updateStore();
	}
}
