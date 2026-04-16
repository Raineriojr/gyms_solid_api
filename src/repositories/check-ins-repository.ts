import type { CheckIn, Prisma } from "generated/prisma/client";

export interface ICheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  countByUserId(userId: string): Promise<number>;
  findManyByUserId(id: string, page?: number): Promise<CheckIn[]>;
}
