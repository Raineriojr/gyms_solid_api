import { expect, it, describe, beforeEach } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";

import { FetchUsersCheckInsHistoryUseCase } from "./fetch-users-check-ins-history-use-case";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: FetchUsersCheckInsHistoryUseCase;

describe("Fetch user check-in history use case", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUsersCheckInsHistoryUseCase(inMemoryCheckInsRepository);
  });

  it("should be able to fetch check in history", async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await inMemoryCheckInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkIns } = await sut.execute({
      userId: "user-01",
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to fetch paginated check in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
