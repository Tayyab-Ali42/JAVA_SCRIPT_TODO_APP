const TODOS = [
    {
        id: 1,
        title: 'React Js',
        description: 'Hello world how are you what are you doin Hello world how are you what are you doingg'
    }
]

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
    const title = todoTitle.value
    const des = todoDesc.value
    if (title == '' || des == '') {
        alert('Please enter your todo detail')
    } else {
        TODOS.push({ id: Date.now(), title, description: des })
        showTodo()
        todoTitle.value = ''
        todoDesc.value = ''
    }


}


function showTodo() {
    const todos = document.querySelector('.todos')
    todos.innerHTML = "";
    TODOS.forEach((todo) => {
        todos.innerHTML += `
        <div class="card">
                    <div class="card-header">
                        <div class="header-left">
                            <img src="/Images/check-box-empty.png" alt="Tick Icon" class="icon" onclick="completeTodo()">
                            <h3 class="title">${todo.title}</h3>
                        </div>
                        <img src="./Images/dots.png" alt="More Options" class="more-icon">
                    </div>
                    <p class="description">${todo.description}</p>
                    

                    <div class="card-footer">
                        <span class="date">10:30 AM - 12:00 PM</span>
                    </div>
                </div>`
    })

}


function completeTodo() {
    console.log('eh')
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
