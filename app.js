// SELECTORS
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
// 3
const filterOption = document.querySelector('.filter-todo')

// EVENT LISTENERS
// 5
document.addEventListener('DOMContentLoaded', getTodos)
// 1
todoButton.addEventListener('click', addTodo)
// 2
todoList.addEventListener('click', deleteCheck)
// 3
filterOption.addEventListener('click', filterTodo)

// FUNCTIONS
// 1
function addTodo(event){
    // PREVENT FORM FROM SUBMITTING
    event.preventDefault()
    // TODO DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    // CREATE LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    // 4
    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value)
    // CHECK MARK BUTTON
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fa fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    // CHECK TRASH BUTTON
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fa fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)
    // APPEND TO LIST
    todoList.appendChild(todoDiv)
    // CLEAR TODO INPUT VALUE
    todoInput.value = ''
}

// 2
function deleteCheck(e){
    const item = e.target
    // DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement
        // ANIMATION
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', () => {
            todo.remove()
        })
    }
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

// 3
function filterTodo(e){
    const todos = todoList.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = none
                }
                break
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = none
                }
                break
        }
    })
}

// 4
function saveLocalTodos(todo){
    let todos 
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

// 5
function getTodos(){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        // CREATE LI
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
        // CHECK MARK BUTTON
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fa fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)
        // CHECK TRASH BUTTON
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fa fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
        // APPEND TO LIST
        todoList.appendChild(todoDiv)
    })
}

// 6
function removeLocalTodos(todo){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}