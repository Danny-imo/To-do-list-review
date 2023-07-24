import { tasks, renderTasks } from './todo.js';

let draggedIndex = null;

export function enableDragAndDrop() {
  const taskList = document.getElementById('task-list');

  taskList.addEventListener('dragstart', (event) => {
    draggedIndex = event.target.dataset.index;
    event.target.classList.add('dragging');
  });

  taskList.addEventListener('dragover', (event) => {
    event.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    const currentElement = event.target.closest('li');

    if (draggingItem && currentElement !== draggingItem) {
      const nextIndex = currentElement ? Number(currentElement.dataset.index) : tasks.length;
      updateDraggedElementIndex(nextIndex);
      currentElement ? currentElement.insertAdjacentElement('beforebegin', draggingItem) : taskList.appendChild(draggingItem);
    }
  });

  taskList.addEventListener('drop', (event) => {
    event.preventDefault();
  });

  taskList.addEventListener('dragend', () => {
    draggedIndex = null;
    const draggingItem = document.querySelector('.dragging');
    if (draggingItem) {
      draggingItem.classList.remove('dragging');
      renderTasks();
    }
  });
}

function updateDraggedElementIndex(newIndex) {
  const currentIndex = tasks.findIndex((task) => task.index.toString() === draggedIndex);
  if (currentIndex !== -1) {
    tasks[currentIndex].index = newIndex;
    tasks.sort((a, b) => a.index - b.index);
    saveTasks();
  }
}
