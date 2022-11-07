window.todos = function (){
    return {
        todos:[],

        editedTodo: null,

        newTodo: '',

        filter: 'all', 

        get active(){
            return this.todos.filter(todo => !todo.completed)
        },

        get completed(){
            return this.todos.filter(todo => todo.completed)
        },

        get filteredTodos(){
            return {
                all: this.todos,
                active: this.active,
                completed: this.completed
            }[this.filter] // acessando a propriedade do objeto

            // if (this.filter === 'all') {
            //     return this.todos;
            // }
            // if (this.filter === 'active') {
            //     return this.active;
            // }
            // if (this.filter === 'completed') {
            //     return this.completed;
            // }
        },

        get allComplete(){
            return this.todos.length === this.completed.length
        },

        addTodo(){
            if (!this.newTodo) {
                return
            }
            this.todos.push({
                id: Date.now(),
                body: this.newTodo,
                completed: false
            })

            this.newTodo = ''
        },

        editTodo(todo){
            todo.cachedBody = todo.body
            this.editedTodo = todo
        },

        cancelEdit(todo){
            todo.body = todo.cachedBody

            this.editedTodo = null

            delete todo.cachedBody
        },

        editComplete(todo){
            if (todo.body.trim() === '') {
                return this.deleteTodo(todo)
            }


            this.editedTodo = null
        },

        deleteTodo(todo){
            let position = this.todos.indexOf(todo)

            this.todos.splice(position, 1)
        },

        toggleAllTodos(){
            let allComplete = this.allComplete

            this.todos.forEach(todo => todo.completed = !allComplete)
        }
    }
}