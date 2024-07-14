document.addEventListener("DOMContentLoaded", () => {
  let inputValue = document.querySelector(".inp");
  let button = document.querySelector(".button");
  let box = document.querySelector(".boxz");
  let deleteAll = document.querySelector(".noselect");

  button.addEventListener("click", addTask);

  function addTask() {
    const taskText = inputValue.value.trim();
    if (taskText !== "") {
      const taskId = `task-${Date.now()}`;
      const task = document.createElement("div");
      task.classList.add("task");
      task.innerHTML = `
      <div class="span1">
        <span class="span-elementz">${taskText}</span>
      </div>
        <div class="game"> 
          <div class="checkbox-wrapper">
            <input type="checkbox" class="check" id="${taskId}">
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
      box.appendChild(task);
      inputValue.value = "";

      task.querySelector(".delete").addEventListener("click", () => {
        box.removeChild(task);
      });

      task.querySelector(".check").addEventListener("change", (event) => {
        let toggleButton = task.querySelector(".span-elementz");
        if (event.target.checked) {
          toggleButton.classList.add("span-element-toggle");
        } else {
          toggleButton.classList.remove("span-element-toggle");
        }
      });
    }
  }

  inputValue.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  deleteAll.addEventListener("click", () => {
    while (box.firstChild) {
      box.removeChild(box.firstChild);
    }
  });
});
