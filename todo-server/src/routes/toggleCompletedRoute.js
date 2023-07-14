const { Todo } = require('../models/todo.model');

async function toggleCompletedRoute (req, res) {
    const { id } = req.params; 
    await Todo.updateOne({_id: id},{completed: req.body.completed}, { upsert: true });
    const query = req.body.user === 1 ? {} : {user: req.body.user};
    const todos = await Todo.find(query);
    return res.send(todos);
}

module.exports = toggleCompletedRoute;