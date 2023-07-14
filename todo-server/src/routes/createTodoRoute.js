const { Todo, validateTodo } = require('../models/todo.model');

async function createTodoRoute(req, res){
    const { error } = validateTodo(req.body);
    if (error) {
        return res.status(400).send({error: error.details[0].message});
    }
    
    const todo = new Todo({
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        user: req.body.user,
        completed: req.body.completed,
    });
    await todo.save();
    res.send(todo);

}
module.exports = createTodoRoute;