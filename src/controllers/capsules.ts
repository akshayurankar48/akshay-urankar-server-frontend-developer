// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules and dependencies
import express from 'express';
import axios from 'axios';

// Retrieve the SpaceX API URL from environment variables
const SPACEX_API = process.env.SPACEX_API;

// Controller function to get information about all SpaceX capsules
export const getAllCapsules = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Make a GET request to the SpaceX API to retrieve information about all capsules
    const capsules = await axios.get(SPACEX_API);

    // Respond with the retrieved capsule data in JSON format
    return res.status(200).json(capsules?.data);
  } catch (error) {
    // Log any errors that occur during the request
    console.log(error);

    // Respond with a Bad Request status code if an error occurs
    return res.sendStatus(400);
  }
};
