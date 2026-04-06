import { expect, it, describe, beforeEach } from "vitest";
import { compare } from "bcrypt";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { RegisterUseCase } from "./register-use-case";
import { UserAlreadyEmailExistsError } from "./errors/user-already-email-exists-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(inMemoryUsersRepository);
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      email: "test@test.com",
      name: "user test",
      password: "123456",
    });

    const isPasswordCorrect = await compare("123456", user.password_hash);

    expect(isPasswordCorrect).toBe(true);
  });

  it("should be able to register user", async () => {
    const { user } = await sut.execute({
      email: "test@test.com",
      name: "user test",
      password: "123456",
    });

    expect(user.password_hash).toEqual(expect.any(String));
  });

  it("should not be able to register user with same email", async () => {
    await sut.execute({
      email: "test@test.com",
      name: "user test",
      password: "123456",
    });

    await expect(async () => {
      await sut.execute({
        email: "test@test.com",
        name: "user test",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(UserAlreadyEmailExistsError);
  });
});
