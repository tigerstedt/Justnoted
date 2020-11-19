// Server config
const express = require('express');
const bodyParser = require('body-parser');
//type of header
const cors = require('cors');
const server = express();
const router = express.Router();
const port = (process.env.PORT || 3000);
const baseUrl =  (process.env.URL || `http://localhost:${port}`);

server.set('port', port);

server.use(cors());
server.use(express.static('public'));
server.use(bodyParser.json());


// Modules
const Auth = require("./src/api/modules/auth");
const User = require("./src/api/modules/user");
const List = require("./src/api/modules/list");
const Task = require("./src/api/modules/task");

// Controllers
const UserController = require("./src/api/controllers/userControl");
// Create a new instance of the user controller
const userController = new UserController();

const ListController = require("./src/api/controllers/listControl");
// Create a new instance of the list controller
const listController = new ListController();

const TaskController = require("./src/api/controllers/taskControl");
// Create a new instance of the list controller
const taskController = new TaskController();




// Routes

// ----- User Routes -----
// GET all users
server.get('/users', async (res, req) => {
  // Send a request to the user module to get all users
  res = [];
  const users = await userController.getUsers();

  res.status(200).json(users).end();
  // return users;
});

// GET user by id
server.get('/users/:id', async (res, req) => {
  // Send a request to the user module to get user
});

// PUT user, update user
server.put('/users/:id', async (res, req) => {
  // Send a request to the user module to update user
});

// POST a new user
server.post('/users', async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  const newUser = new User(username, email, password);

  // const created = await newUser.create();
  const created = await userController.createUser(newUser.username, newUser.email, newUser.password);
  
  res.status(200).json(created).end();
});

// ----- Auth Routes -----


// ----- List Routes -----
// GET all lists
server.get('/lists', async (res, req) => {
  // Send a request to the lists module to get all lists
  // Return lists;
});

server.post('/lists', async (req, res) => {
  let listTitle = req.body.listTitle;

  const newList = new List(listTitle);

  // const createdList = await newList.create();
  const createdList = await listController.createList(newList.listTitle);
  
  res.status(200).json(createdList).end();
});

// GET list by id
server.get('/lists/:id', async (res, req) => {
  // Send a request to the list module to get list
  // Not 100% sure if needed
});

// PUT list by id, update list
server.put('/lists/:id', async (res, req) => {
  // Send a request to the list module to update list
});

// DELETE list by id, update list
server.delete('/lists/:id', async (res, req) => {
  // Send a request to the list module to delete list
});


// ----- List Item Routes -----
// GET all tasks for list
server.get('/tasks', async (res, req) => {
  // Send a request to the list module to get all tasks
  res = []
  
  const getTasks = await taskController.getTasks();

  res.status(200).json(getTasks);
  // return tasks;
  
});

// GET list item by id
server.get('/lists/:listId/items/:id', async (res, req) => {
  // Send a request to the list module to get list item by id
  // Not 100% sure if needed
});

// PUT list item, update list item
server.put('/lists/:listId/items/:id', async (res, req) => {
  // Send a request to the list item module to update list item
});

// DELETE list item, update list item
server.delete('/lists/:listId/items/:id', async (res, req) => {
  // Send a request to the list item module to delete list item
});

server.post('/tasks', async (req, res) => {
  let task = req.body.task;

  const newTask = new Task(task);

  // const created = await newUser.create();
  const createdTask = await taskController.createTask(newTask.task);
  
  res.status(200).json(createdTask).end();
});

// ----- Other Routes -----
server.get("/", (req, res, next) => {
  console.log("heisann");
  res.status(200).send("Hello World").end();
});

// Make server listen on port 3000
server.listen(server.get('port'), function () {
  console.log('server running', server.get('port'));
});
