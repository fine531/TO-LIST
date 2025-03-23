document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") addTask();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        let li = document.createElement("li");
        li.textContent = taskInput.value;
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        
        saveTasks();
        taskInput.value = "";
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.textContent.replace("❌", "").trim(),
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    storedTasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("completed");
        
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => {
            taskList.removeChild(li);
            saveTasks();
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
