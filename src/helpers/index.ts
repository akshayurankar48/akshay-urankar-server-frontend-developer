require('dotenv').config();
import crypto from 'crypto';

const SECRET: string = process.env.SECRET;

export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
};

export const random = (): string => crypto.randomBytes(128).toString('base64');
