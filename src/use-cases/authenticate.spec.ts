import { describe, expect, it } from "vitest";
import { hash } from "bcrypt";
import { AuthenticateUseCase } from "./authenticate-use-case";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-respository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate use case", () => {
  it("should be able to authenticate", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(inMemoryUsersRepository);

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
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(inMemoryUsersRepository);

    await expect(async () => {
      await sut.execute({
        email: "test@test.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(inMemoryUsersRepository);

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
