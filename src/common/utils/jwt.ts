import * as jwt from 'jsonwebtoken';

export const verifyToken  =  (token: any, secret: any) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return false;
    }
    console.log("type of decode", typeof decode);
    console.log("decode", decode);
    
    return decode;
})



export const generateToken = (username: string) => {
  const token = jwt.sign({ username: username }, 'secret');
  return token;
}