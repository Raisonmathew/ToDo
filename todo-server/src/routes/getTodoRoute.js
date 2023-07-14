const { Todo } = require('../models/todo.model');

async function getTodosRoute (req, res) {
    console.log(req.params.id)
    const query = req.params.id === '1' ? {} : {user: req.params.id};
    console.log(query);

    const alltodos = await Todo.find(query);
    console.log(alltodos);
    return res.send(alltodos);
}

module.exports = getTodosRoute;