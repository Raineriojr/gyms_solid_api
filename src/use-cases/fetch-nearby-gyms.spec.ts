import { expect, it, describe, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms-use-case";

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch nearby gyms use case", () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(inMemoryGymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await inMemoryGymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: 0.0873589,
      longitude: -51.0876417,
    });

    await inMemoryGymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -0.8367799,
      longitude: -52.5210662,
    });

    const { gyms } = await sut.execute({
      userLatitude: 0.0873589,
      userLongitude: -51.0876417,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
