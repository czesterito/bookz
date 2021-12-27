import {Book} from './book';

export class Advertisement {
  id: number;
  book: Book;
  city: string;
  description: string;
  active: boolean;

  constructor(id: number, book: Book, city: string, description: string, active: boolean) {
    this.id = id;
    this.book = book;
    this.city = city;
    this.description = description;
    this.active = active;
  }
}
