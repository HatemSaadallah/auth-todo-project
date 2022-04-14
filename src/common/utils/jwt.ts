import * as jwt from 'jsonwebtoken';
import { Users } from 'src/modules/user/user.model';


export const verifyToken: any = (token: string, secret: string) =>
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return err;
    }
    return decode;
})



export const generateToken = (user: Users) => {
  const token = jwt.sign({ id: user.id }, 'secret');
  return token;
}