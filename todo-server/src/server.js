const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User } = require('./models/users.model');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 8000;

dotenv.config();

const MONGO_URL = process.env.MONGO_URI;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log("Mongo db connection successful")
});

mongoose.connection.on('error', () => {
    console.log("Mongo db connection failed")
});

async function createAdminUser() {
    try {
        const adminUser = {
            userName: 'Admin',
            email: 'admin@gmail.com',
            password: '123456',
            isAdmin: true
        }
        const salt = await bcrypt.genSalt(10);
        adminUser.password = await bcrypt.hash(adminUser.password, salt);
        await User.updateOne(adminUser,
        {
            email: 'admin@gmail.com'
        },
        {
            upsert: true
        })
    } catch(err) {
        console.log(`Got error ${err}`);
    }
}

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await createAdminUser();
    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    });
}

startServer();