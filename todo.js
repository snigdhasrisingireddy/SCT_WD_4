let tasks = [
  { text: "Complete internship report", time: "2025-05-04T10:00", completed: true },
  { text: "Team meeting at 3 PM", time: "2025-05-04T15:00", completed: false },
  { text: "Review GitHub commits", time: "2025-05-05T09:00", completed: false }
];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
} else {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text} (${task.time})</span>
      <div class="actions">
        <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Done'}</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("taskText").value.trim();
  const time = document.getElementById("taskTime").value;
  if (!text || !time) return alert("Please fill in both fields.");
  tasks.push({ text, time, completed: false });
  document.getElementById("taskText").value = '';
  document.getElementById("taskTime").value = '';
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  const newTime = prompt("Edit task time:", tasks[index].time);
  if (newText && newTime) {
    tasks[index].text = newText;
    tasks[index].time = newTime;
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

renderTasks();