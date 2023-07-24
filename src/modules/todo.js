export let tasks = [];

export function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      toggleCompleted(index);
    });

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.value = task.description;
    descriptionInput.addEventListener('input', (event) => {
      updateTaskDescription(index, event.target.value);
    });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.addEventListener('click', () => {
      editTask(index);
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(descriptionInput);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);
    listItem.classList.add(task.completed ? 'completed' : 'uncompleted');
    taskList.appendChild(listItem);
  });
}

export function addTask() {
  const taskInput = document.getElementById('task-input');
  const description = taskInput.value.trim();

  if (description !== '') {
    const newTask = {
      description,
      completed: false,
      index: tasks.length + 1,
    };

    tasks.push(newTask);
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
}

export function deleteTask(index) {
  tasks.splice(index, 1);
  updateIndexes();
  saveTasks();
  renderTasks();
}

export function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

export function updateTaskDescription(index, newDescription) {
  tasks[index].description = newDescription.trim();
  saveTasks();
}

export function editTask(index) {
  const listItem = document.querySelectorAll('.todo-li')[index];
  const descriptionInput = listItem.querySelector('input[type="text"]');
  descriptionInput.focus();
}

export function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  updateIndexes();
  saveTasks();
  renderTasks();
}

export function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}

function updateIndexes() {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', () => {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks();
});
