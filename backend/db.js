const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://quentinaltieri:jpAdlpJNdOKOHN6H@cluster0.kbk7o2x.mongodb.net/?retryWrites=true&w=majority';

const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection failed', err);
    }
};

module.exports = connectDb;
