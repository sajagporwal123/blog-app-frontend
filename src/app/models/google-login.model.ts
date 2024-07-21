import { User } from './user.model';

export interface GoogleLoginJWT {
  jwt: string;
  message: string;
  user: User;
}
