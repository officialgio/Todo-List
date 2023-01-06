// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

// Functions 

function addTodo(event) {
    event.preventDefault();

    // Create a new Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    // Add todo to local storage
    saveLocalTodos(todoInput.value);

    // Check btn
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
    completedButton.classList.add('complete-button');
    todoDiv.appendChild(completedButton);

    // Trash btn
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    // Clear todoInput
    todoInput.value = '';

}

function deleteCheck(event) {
    const item = event.target;

    // Delete Todo 
    if (item.classList[0] === 'trash-button') {
        const todo = item.parentElement; // div
        // Wait for the Animation and then remove
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => todo.remove());
    }

    // Check Todo 
    if (item.classList[0] === 'complete-button') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    console.log(todos)
    todos.forEach((todo) => {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed'))
                    todo.style.display = 'flex';
                else
                    todo.style.display = 'none';
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed'))
                    todo.style.display = 'flex';
                else
                    todo.style.display = 'none';
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // Check if there's an existing local todo
    const todos = checkLocalStorage();

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    // Check if there's an existing local todo
    const todos = checkLocalStorage();

    todos.forEach((todo) => {
        // Create a new Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);

        // Check btn
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-sharp fa-solid fa-check"></i>';
        completedButton.classList.add('complete-button');
        todoDiv.appendChild(completedButton);

        // Trash btn
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
        trashButton.classList.add('trash-button');
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
    })
}


function removeLocalTodos(todo) {
    const todos = checkLocalStorage();

    // todo.children => HTMLCollection(3) [li.todo-item, button.complete-button, button.trash-button]

    // Get the index of the children
    // Remove only that 1 element from its index in the todos[]
    // set the local storage to its new array
    const todoIndex = todo.children[0].innerText; // GET <li> inner text </li>
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


const checkLocalStorage = () => {
    let todos;

    if (localStorage.getItem('todos') === null)
        todos = [];
    else
        todos = JSON.parse(localStorage.getItem('todos'));

    return todos;
}