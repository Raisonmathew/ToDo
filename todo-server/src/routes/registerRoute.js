const { User, validate } = require('../models/users.model');
const bcrypt = require('bcrypt');

async function registerRoute(req, res){
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send({error: error.details[0].message});
    }
    
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send({error: 'That user already exisits!'});
    } else {
        user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        return res.send(user);
    }

}
module.exports = registerRoute;