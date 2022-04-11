import * as jwt from 'jsonwebtoken';
import { Users } from 'src/modules/user/user.model';

export const verifyToken  =  (token: any, secret: any) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return false;
    }
    console.log("type of decode", typeof decode);
    console.log("decode", decode);
    
    return decode;
})



export const generateToken = (user: Users) => {
  const token = jwt.sign({ username: user.username }, 'secret');
  return token;
}