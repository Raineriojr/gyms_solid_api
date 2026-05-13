import type { CheckIn } from "@prisma/client";
import type { ICheckInsRepository } from "@/repositories/check-ins-repository";

interface IFetchUsersCheckInsUseCaseRequest {
  userId: string;
  page?: number;
}

interface IFetchUsersCheckInsUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUsersCheckInsHistoryUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUsersCheckInsUseCaseRequest): Promise<IFetchUsersCheckInsUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return {
      checkIns,
    };
  }
}
