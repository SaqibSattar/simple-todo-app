const todoList = document.getElementById("todoList");
const newTodoInput = document.getElementById("newToDoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const filterOptions = document.getElementById("filterOptions");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

// Load saved to-do list on page load
window.onload = function () {
    loadTodoList();
};

addTodoBtn.addEventListener("click", () => {
    const newTodoText = newTodoInput.value;

    if (newTodoText !== "") {
        const newTodoItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const todoText = document.createElement("span");
        todoText.innerText = newTodoText;
        const deleteTodoBtn = document.createElement("button");
        deleteTodoBtn.innerText = "X";

        deleteTodoBtn.classList.add("delete-todo-btn");
        deleteTodoBtn.addEventListener("click", function () {
            newTodoItem.remove();
            saveTodoList();
        });

        newTodoItem.appendChild(checkbox);
        newTodoItem.appendChild(todoText);
        newTodoItem.appendChild(deleteTodoBtn);
        todoList.appendChild(newTodoItem);
        newTodoInput.value = "";

        // Save to-do list after adding a new item
        saveTodoList();
    }
});

filterOptions.addEventListener("change", () => {
    const filterValue = filterOptions.value;
    const todoItems = todoList.querySelectorAll("li");

    todoItems.forEach((item) => {
        switch (filterValue) {
            case "all":
                item.style.display = "flex";
                break;
            case "completed":
                item.style.display = item.querySelector("input[type='checkbox']").checked ? "flex" : "none";
                break;
            case "active":
                item.style.display = item.querySelector("input[type='checkbox']").checked ? "none" : "flex";
                break;
            default:
                break;
        }
    });
});

clearCompletedBtn.addEventListener("click", () => {
    const completedItems = todoList.querySelectorAll("li input[type='checkbox']:checked");

    completedItems.forEach((item) => {
        item.closest("li").remove();
        saveTodoList();
    });
});

clearAllBtn.addEventListener("click", () => {
    todoList.innerHTML = ""; // Clear all items
    saveTodoList();
});

// Save to-do list in localStorage
function saveTodoList() {
    const todoItems = [];
    todoList.querySelectorAll("li").forEach((item) => {
        const todoText = item.querySelector("span").innerText;
        const isChecked = item.querySelector("input[type='checkbox']").checked;
        todoItems.push({ text: todoText, completed: isChecked });
    });
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

// Load saved to-do list from localStorage
function loadTodoList() {
    const savedTodoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

    savedTodoItems.forEach((item) => {
        const newTodoItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        const todoText = document.createElement("span");
        todoText.innerText = item.text;
        const deleteTodoBtn = document.createElement("button");
        deleteTodoBtn.innerText = "X";

        deleteTodoBtn.classList.add("delete-todo-btn");
        deleteTodoBtn.addEventListener("click", function () {
            newTodoItem.remove();
            saveTodoList();
        });

        newTodoItem.appendChild(checkbox);
        newTodoItem.appendChild(todoText);
        newTodoItem.appendChild(deleteTodoBtn);
        todoList.appendChild(newTodoItem);
    });
}
