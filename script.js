let TODOS = JSON.parse(localStorage.getItem('todos')) || []

const addTodoBtn = document.querySelector('.add-btn')
const addTodoOverly = document.getElementById('addTodo__overly')
const addTodoCancel = document.querySelector('.addTodo-cancel-btn')
const todoTitle = document.querySelector('.todo_title')
const todoDesc = document.querySelector('.todo_des')
const saveTodo = document.querySelector('.addTodo-btn')




function addTodo() {
    addTodoOverly.style.display = 'flex'
}


function todoDetail() {

    // GENERATE RANDOM COLOR

    const hex = "BCDEF"; // only light hex digits
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * hex.length)];
    }


    const title = todoTitle.value
    const des = todoDesc.value
    if (title == '' || des == '') {
        alert('Please enter your todo detail')
        return
    }
    let todo = {
        id: Date.now(),
        title: title,
        description: des,
        color: color
    }
    TODOS.push(todo)
    localStorage.setItem('todos', JSON.stringify(TODOS))
    showTodo()
    todoTitle.value = ''
    todoDesc.value = ''
}





function showTodo() {
    const todos = document.querySelector('.todos')
    todos.innerHTML = "";
    TODOS.forEach((todo) => {
        todos.innerHTML += `
        <div class="card" style="background-color:${todo.color} ;">
                    <div class="card-header">
                        <div class="header-left">
                            <img src="/Images/check-box-empty.png" alt="Tick Icon" class="icon" onclick="completeTodo(event)">
                            <h3 class="title">${todo.title}</h3>
                        </div>
                        <img src="./Images/delete.png" alt="More Options"  data-id=${todo.id} class="more-icon" onclick="deleteTodo(event)">
                    </div>
                    <p class="description">${todo.description}</p>
                    

                    <div class="card-footer">
                        <span class="date">10:30 AM - 12:00 PM</span>
                    </div>
                </div>`
    })

}


function completeTodo(e) {
    console.log(e.target)
}

function deleteTodo(event) {
    let id = Number(event.target.dataset.id)
    TODOS = TODOS.filter((item) => item.id !== id); // save the filtered array
    localStorage.setItem('todos', JSON.stringify(TODOS));
    showTodo()
}



addTodoBtn.addEventListener('click', () => {
    addTodo()
})
addTodoCancel.addEventListener('click', () => {
    addTodoOverly.style.display = 'none'
    todoTitle.value = ''
    todoDesc.value = ''
})
saveTodo.addEventListener('click', () => {
    todoDetail()
    addTodoOverly.style.display = 'none'
})

showTodo()



