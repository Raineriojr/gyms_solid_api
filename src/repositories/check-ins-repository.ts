import type { CheckIn, Prisma } from "@prisma/client";

export interface ICheckInsRepository {
  findById(id: string): Promise<CheckIn | null>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  countByUserId(userId: string): Promise<number>;
  findManyByUserId(id: string, page?: number): Promise<CheckIn[]>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}
