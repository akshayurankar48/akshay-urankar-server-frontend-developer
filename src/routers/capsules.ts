// Import necessary modules and dependencies
import express from 'express';
import { getAllCapsules } from '../controllers/capsules';
import { isAuthenticated } from '../middlewares';

// Export a function that configures routes related to capsules
export default (router: express.Router) => {
  // Define a GET route for retrieving information about all capsules
  // This route is protected by the isAuthenticated middleware, ensuring authentication
  // If authenticated, the getAllCapsules controller is invoked to handle the request
  router.get('/capsules', isAuthenticated, getAllCapsules);
};
