ocument.addEventListener("DOMContentLoaded", () => {
  let inputValue = document.querySelector(".inp");
  let button = document.querySelector(".button");
  let box = document.querySelector(".boxz");
  let deleteAll = document.querySelector(".noselect");

  loadTasksFromLocalStorage();

  button.addEventListener("click", addTask);

  function addTask() {
    const taskText = inputValue.value.trim();
    if (taskText !== "") {
      const taskId = `task-${Date.now()}`;
      const task = createTaskElement(taskId, taskText, false);
      box.appendChild(task);
      saveTasksToLocalStorage();
      inputValue.value = "";
    }
  }

  function createTaskElement(taskId, taskText, completed) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.innerHTML = `
      <div class="span1">
        <span class="span-elementz ${
          completed ? "span-element-toggle" : ""
        }">${taskText}</span>
      </div>
      <div class="game">
        <div class="checkbox-wrapper">
          <input type="checkbox" class="check" id="${taskId}" ${
      completed ? "checked" : ""
    }>
          <label for="${taskId}" class="label">
            <svg width="45" height="45" viewBox="0 0 95 95">
              <rect x="30" y="20" width="50" height="50" stroke="black" fill="none"></rect>
              <g transform="translate(0,-952.36222)">
                <path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="black" stroke-width="3" fill="none" class="path1"></path>
              </g>
            </svg>
            <span>Checkbox</span>
          </label>
        </div>
        <button class="delete">Delete</button>
      </div>
    `;

    task.querySelector(".delete").addEventListener("click", () => {
      box.removeChild(task);
      saveTasksToLocalStorage();
    });

    task.querySelector(".check").addEventListener("change", (event) => {
      let toggleButton = task.querySelector(".span-elementz");
      if (event.target.checked) {
        toggleButton.classList.add("span-element-toggle");
      } else {
        toggleButton.classList.remove("span-element-toggle");
      }
      saveTasksToLocalStorage();
    });
    return task;
  }

  //saves to localstorage

  function saveTasksToLocalStorage() {
    const tasks = [];
    box.querySelectorAll(".task").forEach((task) => {
      const taskId = task.querySelector(".check").id;
      const taskText = task.querySelector(".span-elementz").textContent;
      const completed = task.querySelector(".check").checked;
      tasks.push({ taskId, taskText, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // loads task from localstorage

  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      const taskElement = createTaskElement(
        task.taskId,
        task.taskText,
        task.completed
      );
      box.appendChild(taskElement);
    });
  }

  deleteAll.addEventListener("click", () => {
    while (box.firstChild) {
      box.removeChild(box.firstChild);
    }
    localStorage.removeItem("tasks");
  });

  inputValue.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
