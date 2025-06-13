

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) {
      li.classList.add('completed');
    }

    // Toggle complete on click
    li.addEventListener('click', () => {
      todos[index].completed = !todos[index].completed;
      saveToLocalStorage();
      renderTodos();
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent li click event
      todos.splice(index, 1);
      saveToLocalStorage();
      renderTodos();
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const todoText = todoInput.value.trim();
  if (todoText === '') {
    alert('Please enter a task');
    return;
  }
  todos.push({ text: todoText, completed: false });
  saveToLocalStorage();
  renderTodos();
  todoInput.value = '';
});

window.onload = renderTodos;
