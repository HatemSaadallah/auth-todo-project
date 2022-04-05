import * as jwt from 'jsonwebtoken';

export const verifyToken : any =  (token, secret) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return false;
    }
    return decode;
})



export const generateToken = (username: string) => {
  const token = jwt.sign({ username: username }, 'secret');
  return token;
}