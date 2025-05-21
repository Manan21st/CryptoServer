const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/crypto-stats';
        await mongoose.connect(mongoURI, {});
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;