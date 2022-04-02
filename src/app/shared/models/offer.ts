import {Book} from './book';
import {Advertisement} from './advertisement';
import {Message} from './message';

export class Offer {
  offerId: number;
  book: Book;
  advertisement: Advertisement;
  messages: Message[];
  accepted: boolean;

  constructor(id: number, book: Book, advertisement: Advertisement, messages: Message[], accepted: boolean) {
    this.offerId = id;
    this.book = book;
    this.advertisement = advertisement;
    this.messages = messages;
    this.accepted = accepted;
  }
}
