const mongoose = require('mongoose');

const CONNECTION_STRING = 'mongodb://localhost:27017/CourseBook'

module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log('Database connected!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}