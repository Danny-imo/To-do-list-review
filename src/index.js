import './style.css';
import {
  renderTasks, addTask, clearCompletedTasks, handleKeyPress,
} from './modules/todo.js';
import { enableDragAndDrop } from './modules/dargDrop.js';

document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  enableDragAndDrop(); // Add this line to enable the drag/drop functionality
});

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('task-input').addEventListener('keypress', handleKeyPress);
document.getElementById('clear-completed-btn').addEventListener('click', clearCompletedTasks);
