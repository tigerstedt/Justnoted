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
const Auth = require("./api/modules/auth");
const User = require("./api/modules/user");
const List = require("./api/modules/list");
const ListItem = require("./api/modules/listItem");

// Controllers
const UserController = require("./api/controllers/user");
// Create a new instance of the user controller
const userController = new UserController();

const ListController = require("./api/controllers/list");
// Create a new instance of the list controller
const listController = new ListController();


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
  let password = req.body.password;

  const newUser = new User(username, password);

  // const created = await newUser.create();
  const created = await userController.createUser(newUser.username, newUser.password);
  
  res.status(200).json(created).end();
});

// ----- Auth Routes -----
//server.post('/login', async (res, req) => {
  // Send a request to the auth module to authenticate user on login
  //let username = req.body.username;
  //let password = req.body.password;

  //const user = new User(username, password);

//});


// ----- List Routes -----
// GET all lists
server.get('/lists', async (res, req) => {
  // Send a request to the list module to get all lists
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
// GET all list items for list
server.get('/lists/:id/items', async (res, req) => {
  // Send a request to the list module to get all lists
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


// ----- Other Routes -----
server.get("/", (req, res, next) => {
  console.log("heisann");
  res.status(200).send("Hello World").end();
});

// Make server listen on port 3000
server.listen(server.get('port'), function () {
  console.log('server running', server.get('port'));
});
