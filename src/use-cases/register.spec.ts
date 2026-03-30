import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-respository";
import { expect, it, describe } from "vitest";

import { RegisterUseCase } from "./register-use-case";
import { compare } from "bcrypt";
import { UserAlreadyEmailExistsError } from "./errors/user-already-email-exists-error";

describe("Register use case", () => {
  it("should hash user password upon registration", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUserCase.execute({
      email: "test@test.com",
      name: "user test",
      password: "123456",
    });

    const isPasswordCorrect = await compare("123456", user.password_hash);

    expect(isPasswordCorrect).toBe(true);
  });

  it("should be able to register user", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUserCase.execute({
      email: "test@test.com",
      name: "user test",
      password: "123456",
    });

    expect(user.password_hash).toEqual(expect.any(String));
  });

  it("should not be able to register user with same email", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository);

    await registerUserCase.execute({
      email: "test@test.com",
      name: "user test",
      password: "123456",
    });

    expect(async () => {
      await registerUserCase.execute({
        email: "test@test.com",
        name: "user test",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(UserAlreadyEmailExistsError);
  });
});
