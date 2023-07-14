const { User } = require('../models/users.model');

async function getAllUsers (req, res) {
    const allUsers = await User.find({});
    res.send(allUsers);
}

module.exports = getAllUsers;