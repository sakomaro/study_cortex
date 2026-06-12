let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function addTask() {

    const input =
        document.getElementById("task-input");

    const text = input.value.trim();

    if (!text) return;

    tasks.unshift({
        id: Date.now(),
        text: text,
        completed: false
    });

    input.value = "";

    saveTasks();
    renderTasks();
}

function toggleTask(id) {

    const task =
        tasks.find(t => t.id === id);

    if (!task) return;

    task.completed = !task.completed;

    saveTasks();
    renderTasks();
}

function deleteTask(id) {

    tasks =
        tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

function renderTasks() {

    const taskList =
        document.getElementById("task-list");

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="task-card">
                <span class="task-text">
                    No tasks yet.
                </span>
            </div>
        `;

        return;
    }

    tasks.forEach(task => {

        taskList.innerHTML += `
            <div class="task-card">

                <div class="task-left">

                    <input
                        type="checkbox"
                        ${task.completed ? "checked" : ""}
                        onchange="toggleTask(${task.id})">

                    <span class="task-text ${task.completed ? "completed" : ""}">
                        ${task.text}
                    </span>

                </div>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>
        `;
    });
}

document
    .getElementById("task-input")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            addTask();
        }

    });

renderTasks();