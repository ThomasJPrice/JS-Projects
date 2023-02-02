// TODO LIST PROJECT
todos = []

function addItem(item) {
    // CLEARING INPUT
    document.getElementsByClassName("add-item-input")[0].value = ''

    if (item.replace(/\s/g, '') !== '') {
        todos.push(item)
        updateTodos(todos)
    }

    console.log(todos);
}

var addItemInput = document.getElementsByClassName('add-item-input')[0]
addItemInput.addEventListener("keydown", function (e) {
    if (e.code === 'Enter') {
        addItem(e.target.value)
    }
})

function changeTick(tickBox) {
    if (tickBox.classList.contains('ticked')) {
        tickBox.classList.remove('ticked')
    }
    else {
        tickBox.classList.add('ticked')
    }
}

function updateTodos(todos) {
    var todosWrapper = document.getElementsByClassName('todo-items')[0]
    todosWrapper.innerHTML = ''

    localStorage.setItem('todos', todos)
    var todos = localStorage.getItem('todos').split(',')

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].replace(/\s/g, '') !== '') {
            var wrapper = document.createElement("div")
            wrapper.classList.add('todo-item')

            var p = document.createElement("p")
            p.classList.add('to-do')
            p.innerHTML = todos[i]

            // CHECKBOX
            var checkboxWrapper = document.createElement('div')
            checkboxWrapper.classList.add('checkbox-wrapper')

            var checkbox = document.createElement('input')
            checkbox.setAttribute("type", "checkbox")
            checkbox.classList.add('checkbox')
            checkbox.setAttribute('onchange', 'changeTick(this)')

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

updateTodos(todos)