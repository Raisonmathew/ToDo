const express = require('express');
const isLoggedIn = require('./middleware/isLoggedIn');

const createTodoRoute = require('./routes/createTodoRoute');
const getTodosRoute = require('./routes/getTodoRoute');
const getTodoByIdRoute = require('./routes/getTodoByIdRoute');
const updateTodoRoute = require('./routes/updateTodoRoute');
const toggleCompletedRoute = require('./routes/toggleCompletedRoute');
const deleteTodoRoute = require('./routes/deleteTodoRoute');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute')
const getAllUsers = require('./routes/usersRoute')

const router = express.Router();

router.post('/login', loginRoute);
router.post('/register', registerRoute);
router.get('/getusers', getAllUsers);

router.post('/todos', isLoggedIn, createTodoRoute);
router.get('/todos/:id', isLoggedIn, getTodosRoute);
router.get('/todos/:id', isLoggedIn, getTodoByIdRoute);
router.put('/todos/:id', isLoggedIn, toggleCompletedRoute);
router.put('/todos', isLoggedIn, updateTodoRoute);
router.delete('/todos/:id', isLoggedIn, deleteTodoRoute);

module.exports = router;