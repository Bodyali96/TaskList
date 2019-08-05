// Define all UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task event
  form.addEventListener("submit", addTask);

  // remove task event
  taskList.addEventListener("click", removeTask);

  // clear tasks event
  clearBtn.addEventListener("click", clearTasks);

  // filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// get tasks from LocalStorage
function getTasks(e) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // because localstorage only stores strings
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    // create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    // create text node and append to li
    li.appendChild(document.createTextNode(task));

    // create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.setAttribute("href", "#");
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Please Add a Task!");
    return;
  }

  // create li element
  const li = document.createElement("li");
  li.className = "collection-item";
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // create new link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.setAttribute("href", "#");
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  taskList.appendChild(li);

  // add to local storage
  storeTasksInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = "";
  e.preventDefault();
}

// Store tasks
function storeTasksInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // because localstorage only stores strings
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  // since all links have X button, we will use event deligation
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      // remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove from local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // because localstorage only stores strings
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  console.log(taskItem);
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear all tasks from view and Localstorage
function clearTasks(e) {
  if (confirm("All tasks will be removed. Are you sure?")) {
    //   first way
    // taskList.innerHTML = "";

    // second way (faster)
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    // remove all tasks from ls
    localStorage.clear();
  }
}
// filter tasks based on text input
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}