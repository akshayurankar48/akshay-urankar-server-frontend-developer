// Import necessary modules and functions
import express from 'express';
import { authentication, random } from '../helpers';
import { getUserByEmail, createUser } from '../db/users';

// Controller function for user registration
export const register = async (req: express.Request, res: express.Response) => {
  try {
    // Extract required information from the request body
    const { email, password, username } = req.body;

    // Validate presence of required fields in the request
    if (!email || !password || !username) {
      return res.sendStatus(400); // Bad Request if missing required fields
    }

    // Check if a user with the given email already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400); // Bad Request if user already exists
    }

    // Generate a random salt for password hashing
    const salt = random();

    // Create a new user with hashed password and salt
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    // Respond with the created user in JSON format
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400); // Bad Request if an error occurs
  }
};

// Controller function for user login
export const login = async (req: express.Request, res: express.Response) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Validate presence of email and password in the request
    if (!email || !password) {
      return res.sendStatus(400); // Bad Request if missing required fields
    }

    // Retrieve user data including password and salt for the given email
    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    // Check if a user with the given email exists
    if (!user) {
      return res.sendStatus(400); // Bad Request if user does not exist
    }

    // Calculate the expected hash based on the provided password and stored salt
    const expectedHash = authentication(user.authentication.salt, password);

    // Compare the expected hash with the stored password hash
    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403); // Forbidden if passwords do not match
    }

    // Generate a new session token and update it in the user's data
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    // Save the updated user data
    await user.save();

    // Set a cookie with the session token for authentication
    res.cookie('BRAINSTORM-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });

    // Respond with the authenticated user data in JSON format
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400); // Bad Request if an error occurs
  }
};
