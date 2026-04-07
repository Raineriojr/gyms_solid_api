import { expect, it, describe, beforeEach } from "vitest";

import { CreateGymUseCase } from "./create-gym-use-case";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create gym use case", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(inMemoryGymsRepository);
  });

  it("should be able to create a new gym", async () => {
    const { gym } = await sut.execute({
      title: "Monster Gym",
      description: null,
      phone: null,
      latitude: -0.8367799,
      longitude: -52.5210662,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
