import { openDb, fetchTodos, createTodo, deleteTodo, updateTodo } from './db.js'

// Get references to the form elements.
const newTodoForm = document.getElementById('todo-form')
const newTodoInput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-ul')

// Handle new todo item form submissions.
newTodoForm.onsubmit = function() {
  // Get the todo text.
  const text = newTodoInput.value

  // Check to make sure the text is not blank (or just spaces).
  if (text.replace(/ /g, '') !== '') {
    // Create the todo item.
    createTodo(text, function(todo) {
      refreshTodos()
    })
  }

  // Reset the input field.
  newTodoInput.value = ''

  // Don't send the form.
  return false
}

window.onload = function() {
  // Display the todo items.
  openDb(refreshTodos)
}

// Update the list of todo items.
function refreshTodos() {
  fetchTodos(function(todos) {
    todoList.innerHTML = ''

    for (let index = todos.length - 1; index >= 0; index--) {
      // Read the todo items backwards (most recent first).
      const todo = todos[index]

      addTodo(todo)
    }
  })
}

function addTodo(todo) {
// Delete button
  const li = document.createElement('li')
  li.className = 'todos'
  li.id = 'todo-' + todo.timestamp
  const deleteBtn = document.createElement('button')
  deleteBtn.type = 'button'
  deleteBtn.className = 'deleteBtn'
  deleteBtn.textContent = 'Delete'
  deleteBtn.setAttribute('data-id', todo.timestamp)


// Input
  const todoText = document.createElement('input')
  todoText.type = 'text'
  todoText.id = 'todoText-' + todo.timestamp
  todoText.value = todo.text
  todoText.spellcheck = false
  todoText.setAttribute('data-id', todo.timestamp)

  todoList.appendChild(li)

  // Setup an event listener for the checkbox.
  deleteBtn.addEventListener('click', function(e) {
    if(confirm('are you sure')){
    const id = parseInt(e.target.getAttribute('data-id'))

    deleteTodo(id, refreshTodos)
    }
  })

// Edit 
 const editBtn = document.createElement('button')
 editBtn.className = 'editBtn'
 editBtn.setAttribute('id', todo.timestamp)
 editBtn.textContent = 'Edit'
 editBtn.type = 'button'
 editBtn.addEventListener('click',function(e){
    let change = document.getElementById(`todoText-${editBtn.id}`).value
    updateTodo(todo.timestamp,change)
    refreshTodos()
 })

 li.appendChild(todoText)
 li.appendChild(deleteBtn)
 li.appendChild(editBtn)

}






