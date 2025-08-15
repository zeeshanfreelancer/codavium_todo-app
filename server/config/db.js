// server/config/db.js
const mongoose = require('mongoose');

let cachedConnection = null; // Store connection between function calls

const connectDB = async () => {
    if (cachedConnection && cachedConnection.readyState === 1) {
        console.log('✅ Using existing MongoDB connection');
        return cachedConnection;
    }

    if (!process.env.MONGO_URI) {
        throw new Error('❌ MONGO_URI is not set in environment variables');
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });

        cachedConnection = conn.connection;
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

        return conn.connection;
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        throw err;
    }
};

module.exports = connectDB;
