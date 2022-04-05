import * as jwt from 'jsonwebtoken';

export const verifyToken =  (token, secret) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decode) => {
      if (err) {
        reject(err);
      }
      resolve(decode);
    });
  }) 

export const generateToken = (username: string) => {
  const token = jwt.sign({ username: username }, 'secret');
  return token;
}