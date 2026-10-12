const manager = new TaskManager();
const loadTasksBtn = document.getElementById("loadTasksBtn");
const taskList = document.getElementById("taskList");
const statusMessage = document.getElementById("statusMessage");
const addTaskForm = document.getElementById("addTaskForm");
const taskTitle = document.getElementById("taskTitle");
const addTaskBtn = document.getElementById("addTaskBtn");

function renderTasks() {
  taskList.textContent = "";

  manager.tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    if (task.completed) {
      taskDiv.classList.add("completed");
    }

    const title = document.createElement("span");
    title.textContent = task.title;

    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.textContent = "Toggle";
    toggleBtn.setAttribute("aria-label", `Toggle ${task.title}`);
    toggleBtn.setAttribute("aria-pressed", String(task.completed));
    toggleBtn.addEventListener("click", () => {
      manager.toggleTask(task.id);
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.setAttribute("aria-label", `Delete ${task.title}`);
    deleteBtn.addEventListener("click", () => {
      manager.removeTask(task.id);
      renderTasks();
    });

    const actions = document.createElement("div");
    actions.classList.add("task-actions");
    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);

    taskDiv.appendChild(title);
    taskDiv.appendChild(actions);
    taskList.appendChild(taskDiv);
  });
}

loadTasksBtn.addEventListener("click", async () => {
  statusMessage.textContent = "Loading tasks...";
  statusMessage.classList.remove("error");
  loadTasksBtn.disabled = true;
  taskTitle.disabled = true;
  addTaskBtn.disabled = true;

  try {
    const rawTasks = await fetchTasks();
    // The assignment asks for a JSON round trip before making Task objects.
    const json = JSON.stringify(rawTasks);
    const parsedTasks = JSON.parse(json);
    const tasks = parsedTasks.map(task => new Task(task.id, task.title, task.completed));
    manager.setTasks(tasks);
    renderTasks();
    statusMessage.textContent = "";
  } catch (error) {
    statusMessage.textContent = "Could not load tasks. Please try again.";
    statusMessage.classList.add("error");
  } finally {
    loadTasksBtn.disabled = false;
    taskTitle.disabled = false;
    addTaskBtn.disabled = false;
  }
});

addTaskForm.addEventListener("submit", event => {
  event.preventDefault();
  const title = taskTitle.value.trim();
  if (!title) {
    statusMessage.textContent = "Please enter a task title.";
    statusMessage.classList.add("error");
    taskTitle.focus();
    return;
  }

  const nextId = Math.max(0, ...manager.tasks.map(task => task.id)) + 1;
  manager.addTask(new Task(nextId, title, false));
  renderTasks();
  statusMessage.textContent = "";
  statusMessage.classList.remove("error");
  addTaskForm.reset();
  taskTitle.focus();
});
