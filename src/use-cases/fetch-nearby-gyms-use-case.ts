import type { Gym } from "../../generated/prisma/client";

import type { IGymsRepository } from "@/repositories/gyms-repository";

interface IFetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface IFetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
  constructor(private gymRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymsUseCaseRequest): Promise<IFetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
