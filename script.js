let TODOS = JSON.parse(localStorage.getItem('todos')) || [];

const addTodoBtn = document.querySelector('.add-btn');
const addTodoOverly = document.getElementById('addTodo__overly');
const addTodoCancel = document.querySelector('.addTodo-cancel-btn');
const todoTitle = document.querySelector('.todo_title');
const todoDesc = document.querySelector('.todo_des');
const firstTime = document.getElementById('firstTime');
const secondTime = document.getElementById('secondTime');
const saveTodo = document.querySelector('.addTodo-btn');
const todosContainer = document.querySelector('.todos');

// Show overlay to add a todo
function addTodo() {
    addTodoOverly.style.display = 'flex';
}

// Generate random light color
function generateColor() {
    const hex = "BCDEF"; // only light hex digits
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * hex.length)];
    }
    return color;
}

// Add a new todo
function todoDetail() {
    const title = todoTitle.value.trim();
    const des = todoDesc.value.trim();
    const fTime = firstTime.value.trim();
    const sTime = secondTime.value.trim();

    if (!title || !des) {
        alert('Please enter your todo details');
        return;
    }

    const todo = {
        id: Date.now(),
        title,
        description: des,
        startTime: fTime,
        endTime: sTime,
        color: generateColor(),
        isCompleted: false
    };

    TODOS.push(todo);
    localStorage.setItem('todos', JSON.stringify(TODOS));
    showTodo();

    // Reset inputs
    todoTitle.value = '';
    todoDesc.value = '';
    firstTime.value = '';
    secondTime.value = '';
    addTodoOverly.style.display = 'none';
}

// Render the todo list
function showTodo() {
    todosContainer.innerHTML = '';

    if (TODOS.length === 0) {
        todosContainer.innerHTML = '<p class="no_todo_title">No todos yet!</p>';
        return;
    }

    TODOS.forEach(todo => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundColor = todo.color;

        card.innerHTML = `
            <div class="card-header">
                <div class="header-left" style="display:flex; align-items:center;">
                    <img src="${todo.isCompleted ? '/Images/check-box.png' : '/Images/check-box-empty.png'}" 
                         data-id="${todo.id}" 
                         alt="Tick Icon" 
                         class="icon">
                    <h3 class="title ${todo.isCompleted ? 'completed' : ''}">${todo.title}</h3>
                </div>
                <img src="./Images/delete.png" alt="Delete" data-id="${todo.id}" class="more-icon">
            </div>
            <p class="description">${todo.description}</p>
            <div class="card-footer">
                <span class="date">${todo.startTime || '10:30'} - ${todo.endTime || '12:00'}</span>
            </div>
        `;
        todosContainer.appendChild(card);
    });
}

// Toggle todo completion
function completeTodo(id) {
    const matchedTodo = TODOS.find(item => item.id === id);
    if (matchedTodo) {
        matchedTodo.isCompleted = !matchedTodo.isCompleted;
        localStorage.setItem('todos', JSON.stringify(TODOS));
        showTodo(); // re-render after update
    }
}

// Delete todo
function deleteTodo(id) {
    TODOS = TODOS.filter(item => item.id !== id);
    localStorage.setItem('todos', JSON.stringify(TODOS));
    showTodo();
}

// Event delegation for dynamically created elements
todosContainer.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    if (e.target.classList.contains('icon')) {
        completeTodo(id);
    }
    if (e.target.classList.contains('more-icon')) {
        deleteTodo(id);
    }
});

// Button listeners
addTodoBtn.addEventListener('click', addTodo);
addTodoCancel.addEventListener('click', () => {
    addTodoOverly.style.display = 'none';
    todoTitle.value = '';
    todoDesc.value = '';
    firstTime.value = '';
    secondTime.value = '';
});
saveTodo.addEventListener('click', todoDetail);

// Initial render on page load
window.addEventListener('load', showTodo);
