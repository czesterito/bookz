import {Book} from './book';

export class Advertisement {
  advertisementId: number;
  book: Book;
  city: string;
  description: string;

  constructor(id: number, book: Book, city: string, description: string) {
    this.advertisementId = id;
    this.book = book;
    this.city = city;
    this.description = description;
  }
}
