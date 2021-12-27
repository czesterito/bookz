export class User {
  userId?: number;
  username: string;
  email: string;

  constructor(username: string, email: string, userId?: number) {
    this.username = username;
    this.email = email;
    this.userId = userId;
  }
}
