const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/users.model');

async function loginRoute(req, res) {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }
    const userData = {
        userId: user._id,
        isAdmin: user.isAdmin,
        username: user.userName
    }
    console.log(process.env.SECRET)
    const token = jwt.sign(userData, process.env.SECRET);
    return res.send({token});
}

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
}

module.exports = loginRoute; 