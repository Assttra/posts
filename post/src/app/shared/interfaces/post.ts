import {Category} from "../enums/category";
import {User} from "./user";

export interface Post {
  id: number
  title: string;
  content: string;
  category: Category;
  anonymousUser: boolean;
  createdAt: Date;
  author: User;
  reactions: any[];
}
