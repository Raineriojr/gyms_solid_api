import { randomUUID } from "node:crypto";
import type { CheckIn } from "generated/prisma/client";
import type { CheckInUncheckedCreateInput } from "generated/prisma/models";
import dayjs from "dayjs";

import type { ICheckInsRepository } from "../check-ins-repository";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  private checkIns: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt);

      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(id: string, page?: number) {
    const checkIns = this.checkIns.filter((checkIn) => checkIn.user_id === id);

    if (page) {
      return checkIns.slice((page - 1) * 20, page * 20);
    }

    return checkIns;
  }

  async create({ gym_id, user_id, validated_at }: CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      gym_id,
      user_id,
      createdAt: new Date(),
      validated_at: validated_at ? new Date(validated_at) : null,
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }
}
