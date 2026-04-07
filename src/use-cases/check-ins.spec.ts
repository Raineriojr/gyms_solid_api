import { expect, it, describe, beforeEach, vi, afterEach } from "vitest";

import { CheckInsUseCase } from "./check-ins-use-case";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/index-browser";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CheckInsUseCase;

describe("Check-ins use case", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CheckInsUseCase(
      inMemoryCheckInsRepository,
      inMemoryGymsRepository,
    );

    await inMemoryGymsRepository.create({
      id: "gym-id-01",
      title: "Monster Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-id-01",
      userId: "user-id-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0, 0));

    await sut.execute({
      gymId: "gym-id-01",
      userId: "user-id-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(
      sut.execute({
        gymId: "gym-id-01",
        userId: "user-id-01",
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice in different days", async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0, 0));

    await sut.execute({
      gymId: "gym-id-01",
      userId: "user-id-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-id-01",
      userId: "user-id-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    inMemoryGymsRepository.gyms.push({
      id: "gym-id-02",
      title: "Movimentação",
      description: null,
      phone: null,
      latitude: new Decimal(-0.8431898),
      longitude: new Decimal(-52.5210978),
    });

    await expect(
      sut.execute({
        gymId: "gym-id-02",
        userId: "user-id-01",
        userLatitude: -0.8367799,
        userLongitude: -52.5210662,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
