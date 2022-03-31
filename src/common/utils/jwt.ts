import * as jwt from 'jsonwebtoken';

export const verifyToken = (token, secret) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return false;
    }
    return decode;
  });

export const generateToken = (username: string) => {
    const token = jwt.sign({ username }, process.env.JWTKEY, { expiresIn: '8h' });
    return token;
}