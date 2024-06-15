const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const JWT_SECRET = 'ssgsdxc3r5321axxz';


async function register(username, email, password) {

    const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (existingEmail) {
        throw new Error('Email is already exist!');
    }

    if (existingUsername) {
        throw new Error('Username is already exist!');
    }

    if (email.length < 10) {
        throw new Error('Email must be at least 10 characters long');
    }

    if (password.length < 4) {
        throw new Error('Password must be at least 4 characters long');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        hashedPassword
    });

    

    return createSession(user);
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (!user) {
        throw new Error('Incorect username or password')
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);
    if (hasMatch == false) {
        throw new Error('Incorect username or password')
    }

    return createSession(user)
}

function createSession({ _id, username, email }) {
    const payload = {
        _id,
        username,
        email
    }

    return jwt.sign(payload, JWT_SECRET);

}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}



module.exports = {
    register,
    login,
    verifyToken
}