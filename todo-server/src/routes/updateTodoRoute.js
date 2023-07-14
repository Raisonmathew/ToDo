const { Todo } = require('../models/todo.model');

async function updateTodoRoute (req, res) { 
    const todo = req.body.todo;
    await Todo.updateOne({_id: todo._id}, todo, { upsert: true });
    const todos = await Todo.find({});
    return res.send(todos);
}

module.exports = updateTodoRoute;