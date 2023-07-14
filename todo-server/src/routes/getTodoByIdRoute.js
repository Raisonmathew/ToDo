const { Todo } = require('../models/todo.model');

async function getTodosByIdRoute (req, res) {
    const { id } = req.params; 
    const todosById = await Todo.findById(id);
    return res.send(todosById);
}

module.exports = getTodosByIdRoute;