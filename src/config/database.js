const mongoose = require('mongoose');
const User = require('../models/userModel');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://root:anF2Q9VCuxpDxui3IlHSBkyU@172.21.73.169:27017');
        console.log('MongoDB connected');
    }catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;