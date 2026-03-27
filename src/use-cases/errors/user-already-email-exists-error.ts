export class UserAlreadyEmailExistsError extends Error {
  constructor() {
    super("Email already exists.");
  }
}
