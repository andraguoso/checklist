const add = document.getElementById("add-task");
const container = document.getElementById("tasks");
const template = document.getElementById("task-template");

const status = ["not-started", "in-progress", "almost-finished", "done"]

let tasks = [
    {
        id: 1,
        name: "",
        deadline: "",
        status: "not-started",
        desc: ""
    }
];

function showTask(task) {
    const newTask = template.content.cloneNode(true);

    newTask.querySelector(".task").dataset.id = task.id;

    newTask.querySelector(".name textarea").value = task.name;
    newTask.querySelector(".deadline input").value = task.deadline;
    // newTask.querySelector(".status select").value = task.status;
    newTask.querySelector(".desc textarea").value = task.desc;

    newTask.querySelector(".delete").dataset.id = task.id;

    container.appendChild(newTask);
}

function showAll() {
    container.innerHTML = "";

    tasks.forEach(function (task) {
        showTask(task);
    });
}

showAll();

add.addEventListener("click", function () {
    const newTask = {
        id: Date.now(),
        name: "",
        deadline: "",
        status: "not-started",
        desc: ""
    };

    tasks.push(newTask);
    showAll();
});

container.addEventListener("input", function (event) {
    const taskElement = event.target.closest(".task");
    if (!taskElement) return;

    const it = tasks.findIndex(function (task) {
        return task.id == taskElement.dataset.id;
    });

    if (it === -1) return;

    if (event.target.matches(".name textarea")) tasks[it].name = event.target.value;
    if (event.target.matches(".deadline input")) tasks[it].deadline = event.target.value;
    // if (event.target.matches(".status select")) tasks[it].status = event.target.value;
    if (event.target.matches(".desc textarea")) tasks[it].desc = event.target.value;

});

// delete button
container.addEventListener("click", function (event) {
    if (event.target.matches(".delete")) {
        const id = Number(event.target.dataset.id);

        tasks = tasks.filter(function (task) {
            return task.id !== id;
        });

        showAll();
    }
});

// opening and closing the options dropdown
container.addEventListener("click", function (event) {
    const statusPerElement = event.target.closest(".status");
    if (!statusPerElement) return;

    const options = statusPerElement.querySelector(".options");
    const button = statusPerElement.querySelector(".status-button");
    if (event.target.matches(".status-button")) {
        options.classList.toggle("open");
        button.classList.toggle("close");
    }

    if (event.target.matches(".options button")) {
        const taskElement = event.target.closest(".task");
        if (!taskElement) return;

        const it = tasks.findIndex(function (task) {
            return task.id == taskElement.dataset.id;
        });

        tasks[it].status = event.target.dataset.value;
        options.classList.remove("open");
        button.classList.remove("close");

        const statusButton = statusPerElement.querySelector(".status-button");
        statusButton.textContent = event.target.textContent;
    }
});