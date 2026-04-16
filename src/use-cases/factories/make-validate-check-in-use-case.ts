import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInsUseCase } from "../validate-check-in-use-case";

export const makeValidateCheckInUseCase = () => {
  const usersRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInsUseCase(usersRepository);

  return useCase;
};
