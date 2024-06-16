const mongoose = require('mongoose');
//TODO rename database
const CONNECTION_STRING = 'mongodb://localhost:27017/SecondHandElectronics'

module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log('Database connected!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}