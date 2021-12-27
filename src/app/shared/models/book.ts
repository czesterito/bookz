import {User} from './user';

export class Book {
  id: number;
  user: User;
  title: string;
  author: string;
  category: string;
  condition: string;

  constructor(id: number, user: User, title: string, author: string, category: string, condition: string) {
    this.id = id;
    this.user = user;
    this.title = title;
    this.author = author;
    this.category = category;
    this.condition = condition;
  }
}
