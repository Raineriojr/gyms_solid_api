import { GetUserMetricsUseCase } from "../get-user-metrics-use-case";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export const makeGetUserMetricsUseCase = () => {
  const usersRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(usersRepository);

  return useCase;
};
