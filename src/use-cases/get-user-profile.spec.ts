import { beforeEach, describe, expect, it } from "vitest";
import { hash } from "bcrypt";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile-use-case";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get user profile use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: "user test",
      email: "test@test.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("user test");
  });

  it("should not be able to get profile with wrong user id", async () => {
    await inMemoryUsersRepository.create({
      name: "user test",
      email: "test@test.com",
      password_hash: await hash("123456", 6),
    });

    await expect(
      sut.execute({
        userId: "wrong-user-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
