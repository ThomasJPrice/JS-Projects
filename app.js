// TODO LIST PROJECT

function addItem(item) {
    // CLEARING INPUT
    document.getElementsByClassName("add-item-input")[0].value = ''

    if (item.replace(/\s/g, '') !== '') {
        todos.push(item + ':' + 'false')
        updateTodos(todos)
    }

}

var addItemInput = document.getElementsByClassName('add-item-input')[0]
addItemInput.addEventListener("keydown", function (e) {
    if (e.code === 'Enter') {
        addItem(e.target.value)
    }
})

function changeTick(tickBox) {
    todoItem = tickBox.parentElement.parentElement.innerText
    if (tickBox.classList.contains('ticked')) {
        tickBox.classList.remove('ticked')

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].split(':')[0] === todoItem) {
                todos[i] = todoItem + ':false'
            }
        }
    }
    else {
        tickBox.classList.add('ticked')

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].split(':')[0] === todoItem) {
                todos[i] = todoItem + ':true'
            }
        }
    }

    console.log(todos);
    localStorage.setItem('todos', todos)
}

function updateTodos(todos) {
    var todosWrapper = document.getElementsByClassName('todo-items')[0]
    const todosNoEmpty = todos.filter((str) => str !== '');
    if (todosNoEmpty != 0) {
        todosWrapper.innerHTML = ''
    } else {
        emptyText = document.createElement("p")
        emptyText.classList.add('empty-list')
        emptyText.innerHTML = 'No items in To Do List'
        todosWrapper.appendChild(emptyText)
    }

    localStorage.setItem('todos', todos)

    for (let i = 0; i < todos.length; i++) {
        curr = todos[i].split(':')
        if (curr[0].replace(/\s/g, '') !== '') {
            var wrapper = document.createElement("div")
            wrapper.classList.add('todo-item')

            var p = document.createElement("p")
            p.classList.add('to-do')
            p.innerHTML = curr[0]

            // CHECKBOX
            var checkboxWrapper = document.createElement('div')
            checkboxWrapper.classList.add('checkbox-wrapper')

            var checkbox = document.createElement('input')
            checkbox.setAttribute("type", "checkbox")
            checkbox.classList.add('checkbox')
            checkbox.setAttribute('onchange', 'changeTick(this)')

            if (curr[1] === 'true') {
                checkbox.classList.add("ticked")
            }

            var innerTick = document.createElement('i')
            innerTick.classList.add('fa-solid')
            innerTick.classList.add('fa-check')

            document.getElementsByClassName('todo-items')[0].appendChild(wrapper)
            wrapper.appendChild(p)
            wrapper.appendChild(checkboxWrapper)
            checkboxWrapper.appendChild(checkbox)
            checkboxWrapper.appendChild(innerTick)
        }
    }
}

function clearList() {
    var todosWrapper = document.getElementsByClassName('todo-items')[0]
    todosWrapper.innerHTML = ''
    todos = []
    localStorage.setItem('todos', '')

    emptyText = document.createElement("p")
    emptyText.classList.add('empty-list')
    emptyText.innerHTML = 'No items in To Do List'
    todosWrapper.appendChild(emptyText)
}

var todos = localStorage.getItem('todos')

if (todos === null) {
    todos = []
}
else {
    todos = todos.split(',')
}

updateTodos(todos)

// CLOCK PROJECT
function updateTime() {
    const date = new Date();
    let [hours, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];

    if (seconds < 10) {
        seconds = '0' + seconds
    }

    if (hours < 10) {
        hours = '0' + hours
    }

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    let formatted = hours + ':' + minutes + ':' + seconds

    timeElem = document.getElementById('time')
    timeElem.innerHTML = formatted
}

interval = setInterval(updateTime, 1000)

// DATE PROJECT
function updateDate() {
    var date = new Date().toLocaleDateString()

    document.getElementById("date").innerHTML = date
}

updateDate()