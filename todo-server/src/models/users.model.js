const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}));

function validateUser(user) {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.required()
    });
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;