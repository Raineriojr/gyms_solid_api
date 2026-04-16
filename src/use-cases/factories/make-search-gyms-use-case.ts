import { SearchGymsUseCase } from "../search-gyms-use-case";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export const makeSearchGymsUseCase = () => {
  const usersRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(usersRepository);

  return useCase;
};
