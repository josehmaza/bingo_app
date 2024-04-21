export class BingoError extends Error {
  constructor(message: any) {
    super(message);
    this.name = 'BingoError';
  }

  getMessage() {
    return this.message;
  }
}
