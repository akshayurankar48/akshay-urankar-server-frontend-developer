// Import necessary modules and dependencies
import express, { Router } from 'express';
import authentication from './authentication';

// Create an instance of Express Router
const router: Router = express.Router();

// Export a function that initializes and configures the router
export default (): express.Router => {
  // Attach authentication middleware to the router
  authentication(router);

  // Return the configured router
  return router;
};
