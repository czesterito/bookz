import {Offer} from './offer';

export class Message {
  messageId: number;
  content: string;
  time: Date;
  nameUser: string;
  offer: Offer;

  constructor(messageId: number, content: string, time: Date, username: string, offer: Offer) {
    this.messageId = messageId;
    this.content = content;
    this.time = time;
    this.nameUser = username;
    this.offer = offer;
  }
}
