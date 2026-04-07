import type { CheckIn, Prisma } from "generated/prisma/browser";

export interface PrismaCheckInsRepository {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>;
}
