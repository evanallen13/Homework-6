import { openDb } from "./db";

const todoForm = document.querySelector('#todo-form')// Form
const toInput = document.querySelector('#todo-input')// Input
const todoUl = document.querySelector('#todo-ul')// Ul

todoForm.addEventListener('submit',function(){
    const text = toInput.value
    toInput.value = ''

    // creatTodo creates 
    createTodo(text,function(){
        // refreshTodo is a callback
        refreshTodo()
    })
    return false
})
window.onload = function(){
    openDb(refreshTodos)
}
function refreshTodos(){
    fetchTodos(function(todos){// Imported Function
        todoUl.innerHTML = ''
        for(let i = 0; index < todos.length; index++ ){
            const todo = todos[index]
            addTodo(todo)
        }
    })
}
function addTodo(todo){
    const li = document.createElement('li')
    li.id = 'todo-' + todo.timestamp
}