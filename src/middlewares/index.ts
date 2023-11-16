// Import necessary modules and dependencies
import express from 'express';
import { merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';

// Middleware function to check user authentication
export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // Extract the session token from the request headers
    const sessionToken: string | string[] = req.headers.sessiontoken;

    // Check if a session token is present in the request headers
    if (!sessionToken) {
      return res.sendStatus(403); // Forbidden if no session token is provided
    }

    // Retrieve the user associated with the provided session token
    const existingUser = await getUserBySessionToken(sessionToken);

    // Check if a user with the given session token exists
    if (!existingUser) {
      return res.sendStatus(403); // Forbidden if no user is found for the session token
    }

    // Merge the user information into the request object for use in subsequent middleware/controllers
    merge(req, { identity: existingUser });

    // Continue to the next middleware or controller in the request pipeline
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400); // Bad Request if an error occurs during authentication
  }
};
