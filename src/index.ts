// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules and libraries
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

// Create an Express application
const app = express();

// Retrieve environment variables
const CLIENT_URL = process.env.CLIENT_URL; // URL of the client application
const MONGO_URI = process.env.MONGO_URI; // MongoDB connection URI
const PORT = process.env.PORT; // Port on which the server will run

// Enable CORS with specified origin and credentials
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// Use compression middleware for response compression
app.use(compression());

// Parse cookies in incoming requests
app.use(cookieParser());

// Parse JSON bodies in incoming requests
app.use(bodyParser.json());

// Create an HTTP server using the Express application
const server = http.createServer(app);

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

// Set Mongoose Promise to global Promise
mongoose.Promise = Promise;

// Connect to MongoDB using the provided connection URI
mongoose.connect(MONGO_URI);

// Listen for MongoDB connection errors
mongoose.connection.on('error', (error: Error) => console.log(error));
