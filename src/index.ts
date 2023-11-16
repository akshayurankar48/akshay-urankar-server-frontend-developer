// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules and libraries
import express, { Express } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './routers';

// Create an Express application
const app: Express = express();

// Retrieve environment variables
const CLIENT_URL: string = process.env.CLIENT_URL; // URL of the client application
const MONGO_URI: string = process.env.MONGO_URI; // MongoDB connection URI
const PORT: string = process.env.PORT; // Port on which the server will run

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
const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(app);

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

// add routes for the app
app.use('/', router());
