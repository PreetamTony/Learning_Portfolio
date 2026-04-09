const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let dragged = null;

const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));

function updateApp() {
    saveTasks();
    renderTasks();
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.dataset.id = task.id;
    li.draggable = true;

    if (task.completed) li.classList.add("completed");

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.classList.add("delete");
    delBtn.dataset.id = task.id;

    li.appendChild(delBtn);

    li.addEventListener('dragstart', function() {
        dragged = this;
        setTimeout(() => this.classList.add('drag'), 0);
    });

    li.addEventListener('dragend', function() {
        setTimeout(() => this.classList.remove('drag'), 0);
        dragged = null;
    });

    li.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    li.addEventListener('dragenter', function(e) {
        e.preventDefault();
        if (this !== dragged) {
            this.classList.add('over');
        }
    });

    li.addEventListener('dragleave', function() {
        this.classList.remove('over');
    });

    li.addEventListener('drop', function() {
        this.classList.remove('over');
        if (this !== dragged) {
            const all = Array.from(taskList.children);
            const draggedId = all.indexOf(dragged);
            const thisId = all.indexOf(this);

            const movedTask = tasks.splice(draggedId, 1)[0];
            tasks.splice(thisId, 0, movedTask);

            updateApp();
        }
    });

    return li;
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });

    taskInput.value = "";
    updateApp();
});

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addBtn.click();
});

taskList.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);

    if (e.target.classList.contains("delete")) {
        tasks = tasks.filter(task => task.id !== id);
    } 
    else if (e.target.tagName === "LI") {
        const task = tasks.find(t => t.id === id);
        if (task) task.completed = !task.completed;
    }

    updateApp();
});

const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
    tasks = [];
    updateApp();
});

renderTasks();