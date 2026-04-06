import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcrypt";
import { AuthenticateUseCase } from "./authenticate-use-case";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate", async () => {
    await inMemoryUsersRepository.create({
      name: "user test",
      email: "test@test.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "test@test.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(async () => {
      await sut.execute({
        email: "test@test.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await inMemoryUsersRepository.create({
      name: "user test",
      email: "test@test.com",
      password_hash: await hash("123456", 6),
    });

    await expect(async () => {
      await sut.execute({
        email: "test@test.com",
        password: "123456789",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
