import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms-use-case";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export const makeFetchNearbyGymsUseCase = () => {
  const usersRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(usersRepository);

  return useCase;
};
