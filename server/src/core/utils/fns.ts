import { randomBytes } from 'crypto';

export const generateRandomString = (length): string => {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};
