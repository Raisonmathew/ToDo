const { Todo } = require('../models/todo.model');

async function deleteTodoRoute (req, res) {
    const { id } = req.params; 
    const todosById = await Todo.deleteOne({_id: id});
    const todos = await Todo.find({});
    return res.send(todos);
}

module.exports = deleteTodoRoute;