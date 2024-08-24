document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        const li = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.textContent = taskInput.value;
        taskText.classList.add("task-text");

        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("button-group");

        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";
        completeButton.classList.add("complete-button");
        completeButton.onclick = function() {
            taskText.classList.toggle("completed");
            li.classList.toggle("completed");
            saveTasks();
        };

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.onclick = function() {
            editTask(li, taskText);
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };

        buttonGroup.appendChild(completeButton);
        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(buttonGroup);
        taskList.appendChild(li);

        taskInput.value = "";
        saveTasks();
    }
}

function editTask(li, taskText) {
    const newTask = prompt("Edit your task:", taskText.textContent);
    if (newTask !== null && newTask.trim() !== "") {
        taskText.textContent = newTask;
        saveTasks();
    }
}

function saveTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = [];

    taskList.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement("li");
            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            taskText.classList.add("task-text");
            if (task.completed) {
                taskText.classList.add("completed");
                li.classList.add("completed");
            }

            const buttonGroup = document.createElement("div");
            buttonGroup.classList.add("button-group");

            const completeButton = document.createElement("button");
            completeButton.textContent = "Complete";
            completeButton.classList.add("complete-button");
            completeButton.onclick = function() {
                taskText.classList.toggle("completed");
                li.classList.toggle("completed");
                saveTasks();
            };

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("edit-button");
            editButton.onclick = function() {
                editTask(li, taskText);
            };

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.onclick = function() {
                taskList.removeChild(li);
                saveTasks();
            };

            buttonGroup.appendChild(completeButton);
            buttonGroup.appendChild(editButton);
            buttonGroup.appendChild(deleteButton);

            li.appendChild(taskText);
            li.appendChild(buttonGroup);
            taskList.appendChild(li);
        });
    }
}