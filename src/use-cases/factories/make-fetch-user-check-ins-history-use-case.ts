import { FetchUsersCheckInsHistoryUseCase } from "../fetch-users-check-ins-history-use-case";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export const makeFetchUserCheckInsHistoryUseCase = () => {
  const usersRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUsersCheckInsHistoryUseCase(usersRepository);

  return useCase;
};
