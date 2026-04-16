import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInsUseCase } from "../check-ins-use-case";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export const makeCheckInsUseCase = () => {
  const usersRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new CheckInsUseCase(usersRepository, gymsRepository);

  return useCase;
};
