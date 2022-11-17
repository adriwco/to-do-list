// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const inputSearch = document.querySelector("#site-search");
const contadorMsg = document.querySelector('#contador');
let oldInputValue;

// Funções
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerHTML = text;
  todo.appendChild(todoTitle);
  
  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);
  todoInput.value = "";
  todoInput.focus();
}

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
}

const updateTodo = (editInputValue) => {
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");
    if(todoTitle.innerHTML === oldInputValue){
      todoTitle.innerHTML = editInputValue;
    }
  });
}

const filterTodos = (todos, inputValueSearch, returnMatchedTodos) => todos
  .filter(todo => {
    const matchedTodos = todo.textContent.toLowerCase().includes(inputValueSearch)
    return returnMatchedTodos ? matchedTodos : !matchedTodos
  })
const manipulateClasses = (todo, classToAdd, classToRemove) => {
  todo.forEach(todo => {
    todo.classList.add(classToAdd)
    todo.classList.remove(classToRemove)
  })
}
const hideTodos = (todos, inputValueSearch) => {
  const todosToHide = filterTodos(todos, inputValueSearch, false)
  manipulateClasses(todosToHide, 'hide', null)
 }
 const showTodos = (todos, inputValueSearch) => {
  const todosToShow = filterTodos(todos, inputValueSearch, true)
  manipulateClasses(todosToShow, null, 'hide')
 }

  function mudarCorContador(numero){
    if(numero >= 11 && numero <= 32){
      contadorMsg.style.color = "#999900";
    }else if(numero >= 33 && numero <= 58){
      contadorMsg.style.color = "#CC6600";
    }else if(numero === 59){
      contadorMsg.style.color = "#FF0000";
    }else{
      contadorMsg.style.color = "#000";
    }
  }

// JQuery 3.5.1
$(document).ready(function(){
  $('input').bind('cut copy paste',function(e) {
      e.preventDefault();
  });
});
$(document).on("input", "#todo-input", function () {
  const limite = 0;
  const caracteresDigitados = $(this).val().length;
  const caracteresRestantes = limite + caracteresDigitados;
  $("#contador").text(caracteresRestantes);
  mudarCorContador(caracteresRestantes);
});

// Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = todoInput.value
  if(inputValue){
    saveTodo(inputValue);
  }
})

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if(parentEl && parentEl.querySelector("h3")){
    todoTitle = parentEl.querySelector("h3").innerHTML;
  }

  if(targetEl.classList.contains("finish-todo")){
    parentEl.classList.toggle("done");
  }

  if(targetEl.classList.contains("remove-todo")){
    parentEl.remove();
  }

  if(targetEl.classList.contains("edit-todo")){
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
})

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
})

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editInputValue = editInput.value;
  if(editInputValue){
    updateTodo(editInputValue);
  }
  toggleForms();
})

inputSearch.addEventListener("input", event => {
  const inputValueSearch = event.target.value.trim().toLowerCase()
  const todos = filterH3 = Array.from(todoList.children)
  hideTodos(todos, inputValueSearch)
  showTodos(todos, inputValueSearch)
})

 // Proxio passo: filtro e gerenciar pela local storage 