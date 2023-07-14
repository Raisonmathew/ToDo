const Joi = require('joi');
const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
    },
    user: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
}));

function validateTodo(todo) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        date: Joi.string().required(),
        description: Joi.string().allow('').optional(),
        user: Joi.string().required(),
        completed: Joi.boolean().required()
    });
    return schema.validate(todo);
}

exports.Todo = Todo;
exports.validateTodo = validateTodo;