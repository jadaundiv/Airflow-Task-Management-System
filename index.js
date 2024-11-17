const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

// Endpoint 1

function addTaskToTaskList(taskId, text, priority) {
  let addtask = { taskId, text, priority };
  tasks.push(addtask);
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addTaskToTaskList(taskId, text, priority);
  res.json(result);
});

// Endpoint 2

function currentTaskList() {
  return tasks;
}

app.get('/tasks', (req, res) => {
  let result = currentTaskList();
  res.json(result);
});

// Endpoint 3

function sortTaskByPriority(task1, task2) {
  return task1.priority - task2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.sort(sortTaskByPriority);
  res.json(result);
});

// Endpoint 4

function editTaskPriority(taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = editTaskPriority(taskId, priority);
  res.json(result);
});

// Endpoint 5

function updateTaskText(taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = UpdateTaskText(taskId, text);
  res.json(result);
});

// Endpoint 6

function deleteTaskList(taskId, tasks) {
  return tasks.taskId != taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((tasks) => deleteTaskList(taskId, tasks));
  res.json(result);
});

// Endpoint 7

function filterTaskByPriority(priority, tasks) {
  return tasks.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((tasks) => filterTaskByPriority(priority, tasks));
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
