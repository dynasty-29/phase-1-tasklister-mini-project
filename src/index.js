document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const sortButton = document.getElementById("sort-button");

  //task array
  let tasks = []; 

  // Function to render the tasks
  function renderTasks() {
    taskList.innerHTML = "";
    const sortedTasks = [...tasks].sort((a, b) => b.priority - a.priority);

    // Add tasks to the DOM
    sortedTasks.forEach((task, index) => {
      const li = document.createElement("li");

      // Set task color based on priority
      if (task.priority === "3") li.style.color = "red";
      else if (task.priority === "2") li.style.color = "yellow";
      else li.style.color = "green";

      // Task text
      li.innerHTML = `
        <span>${task.text} (Priority: ${task.priority}, Due: ${task.dueDate})</span>
        <button class="delete-button" data-index="${index}">Delete</button>
        <button class="edit-button" data-index="${index}">Edit</button>
      `;

      taskList.appendChild(li);
    });
  }

  // Function to handle form submission
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskInput = document.getElementById("task-input");
    const priorityInput = document.getElementById("priority-input");
    const dueDateInput = document.getElementById("due-date-input");

    // Add the new task to the list
    tasks.push({
      text: taskInput.value,
      priority: priorityInput.value,
      dueDate: dueDateInput.value,
    });

    // Clear input fields
    taskInput.value = "";
    priorityInput.value = "1";
    dueDateInput.value = "";

    renderTasks();
  });

  // Function to handle task deletion
  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
      const index = e.target.getAttribute("data-index");
      tasks.splice(index, 1); 
      renderTasks();
    }
  });

  // Function to handle task editing
  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-button")) {
      const index = e.target.getAttribute("data-index");
      const task = tasks[index];

      // Populate the form with the task details
      document.getElementById("task-input").value = task.text;
      document.getElementById("priority-input").value = task.priority;
      document.getElementById("due-date-input").value = task.dueDate;

      // Remove the task from the array
      tasks.splice(index, 1);

      renderTasks();
    }
  });

  // Sort tasks when the sort button is clicked
  sortButton.addEventListener("click", () => {
    tasks.reverse(); // Toggle sort order
    renderTasks();
  });
});
