import {User} from './user';

export class Book {
  bookId: number;
  user: User;
  title: string;
  author: string;
  category: string;
  taken: boolean;

  constructor(id: number, user: User, title: string, author: string, category: string, taken: boolean = false) {
    this.bookId = id;
    this.user = user;
    this.title = title;
    this.author = author;
    this.category = category;
    this.taken = taken;
  }
}
