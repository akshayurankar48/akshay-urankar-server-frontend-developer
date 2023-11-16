// Import necessary modules and dependencies
import express from 'express';
import { login, register } from '../controllers/authentication';

// Export a function that configures routes for user authentication
export default (router: express.Router) => {
  // Define a route for user registration, mapped to the register controller
  router.post('/auth/register', register);

  // Define a route for user login, mapped to the login controller
  router.post('/auth/login', login);
};
