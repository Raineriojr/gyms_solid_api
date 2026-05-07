import type { Gym } from "../../generated/prisma/client";

import type { IGymsRepository } from "@/repositories/gyms-repository";

interface ISearchGymsUseCaseRequest {
  query: string;
  page: number;
}

interface ISearchGymsUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: ISearchGymsUseCaseRequest): Promise<ISearchGymsUseCaseResponse> {
    const gyms = await this.gymRepository.searchMany(query, page);

    return {
      gyms,
    };
  }
}
