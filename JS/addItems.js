
/**
 * @typedef {Object} Item
 * @property {string} value - The value of the item.
 * @property {number} id - The unique identifier for the item.
 * @property {boolean} complete - Indicates whether the item is complete.
 * @property {boolean} important - Indicates whether the item is important.
 */


let items = []

function itemCreator() {
    let id = 0;

    /**
     * @param {string} value
     */
    return (value) => ({
        value: value,
        id: ++id,
        complete: false,
        important: false
    });
}

const createItem = itemCreator();


// template
/**
 * @param {number} id
 * @param {string} value
 */
function makeTodoHTML(id, value) {
    return `<div id="${id}" class="aTodoItem draggable" draggable="true">
        <li class="todoContent" contentEditable="true">${value}</li>
        <button class="completeBtn">Done</button>
        <button class="importantBtn">Important</button>
        <button class="deleteBtn">Delete</button>
    </div>
    `
}

/**
 * @param {Item} item
 */
function makeTodoElement(item) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = makeTodoHTML(item.id, item.value);
    const todoHtml = wrapper.firstChild;

    const completeBtn = wrapper.querySelector('.completeBtn');
    const importantBtn = wrapper.querySelector('.importantBtn');
    const deleteBtn = wrapper.querySelector('.deleteBtn');
    const todoContent = wrapper.querySelector('.todoContent');

    todoContent.addEventListener('input', () => {
        item.value = todoContent.textContent;
    });

    // handle complete button
    completeBtn.addEventListener('click', () => {
        item.complete = !item.complete;
        todoContent.innerHTML = item.complete ? item.value + "✅" : item.value;
    })

    // handle important button
    importantBtn.addEventListener("click", () => {
        item.important = !item.important;
        todoContent.style.backgroundColor = item.important ? "#618264" : "#F5F5DC";
        todoContent.style.color = item.important ?  "#F5F5DC" : "#618264";
    })

    // handle delete button
    deleteBtn.addEventListener('click', () => {
        todoHtml.remove();
        items = items.filter(i => i.id !== item.id)
    })

    return todoHtml;
}


document.querySelector("#addBtn").addEventListener("click", showItem)
document.querySelector("#addInput").addEventListener("keypress", (e) => {
    if (e.key == 'Enter') {
        showItem()
    }
})

function showItem() {
    const newTodo = document.getElementById("addInput").value;

    if (newTodo?.trim() === "") {
        alert("Please enter your To-Do item");
        return;
    }

    const newItem = createItem(newTodo);
    items.push(newItem);
    const newContainer = makeTodoElement(newItem);
    const container = document.getElementById("addItemContainer");
    container.append(newContainer)

    // clear input area
    document.getElementById("addInput").value = null;
}