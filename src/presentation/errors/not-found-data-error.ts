export class NotFoundDataError extends Error {
  constructor(message: string) {
    super(`NotFoundDataError: ${message}`);
    this.name = `${message}`;
  }
}
