import { User } from './user.model';

export interface Blog {
  title: string;
  content: string;
  createdAt: Date;
  user: User;
  _id: string;
}
