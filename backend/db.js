require("dotenv").config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

// Validate environment variables before attempting connection
if (!mongoURI) {
    console.error("MongoDB URI is undefined. Check your .env file:");
    console.log("Required format: MONGO_URI=mongodb://localhost:27017/your-database-name");
    process.exit(1);
}

const connectToMongo = async () => {
    try {
        // Configure mongoose connection settings
        mongoose.set('strictQuery', false);

        // Remove deprecated options and use modern connection
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,  // 5 seconds timeout
            retryWrites: true,
            w: 'majority'
        });

        console.log("Connected to MongoDB successfully");
        console.log(`Database: ${mongoose.connection.name}`);
        console.log(`Host: ${mongoose.connection.host}:${mongoose.connection.port}`);

        // Handle connection events
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

    } catch (err) {
        console.error("Error connecting to MongoDB:");
        console.error(err.message);
        
        // Provide helpful debug information
        if (err.name === 'MongoServerSelectionError') {
            console.log("\n Troubleshooting tips:");
            console.log("1. Check if MongoDB is running");
            console.log("2. Verify connection string format:");
            console.log("   mongodb://username:password@host:port/database");
            console.log("3. Check firewall settings");
        }
        
        process.exit(1);
    }
};

// Add graceful shutdown handling
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
    }
});

module.exports = connectToMongo;
