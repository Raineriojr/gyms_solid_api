import type { CheckIn } from "@prisma/client";
import type { ICheckInsRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

interface IValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface IValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    checkInId,
  }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreate = dayjs(new Date()).diff(
      checkIn.createdAt,
      "minutes",
    );

    if (distanceInMinutesFromCheckInCreate > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
