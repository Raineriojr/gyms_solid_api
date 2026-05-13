import type { IUsersRepository } from "@/repositories/users-repository";
import type { User } from "@prisma/client";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface IGetUserProfileUseCaseRequest {
  userId: string;
}

interface IGetUserProfileUseCaseResponse {
  user: Partial<User> | User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
