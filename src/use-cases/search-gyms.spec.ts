import { expect, it, describe, beforeEach } from "vitest";

import { SearchGymsUseCase } from "./search-gyms-use-case";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search gyms use case", () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(inMemoryGymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await inMemoryGymsRepository.create({
      title: "Monster Gym",
      description: null,
      phone: null,
      latitude: -0.8367799,
      longitude: -52.5210662,
    });

    await inMemoryGymsRepository.create({
      title: "Movimentação Gym",
      description: null,
      phone: null,
      latitude: -0.8367799,
      longitude: -52.5210662,
    });

    const { gyms } = await sut.execute({
      query: "Monster",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Monster Gym" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `Monster Gym - ${i}`,
        description: null,
        phone: null,
        latitude: -0.8367799,
        longitude: -52.5210662,
      });
    }

    const { gyms } = await sut.execute({
      query: "Monster",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Monster Gym - 21" }),
      expect.objectContaining({ title: "Monster Gym - 22" }),
    ]);
  });
});
