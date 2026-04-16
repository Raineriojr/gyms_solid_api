import { CreateGymUseCase } from "../create-gym-use-case";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export const makeCreateGymUseCase = () => {
  const usersRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(usersRepository);

  return useCase;
};
