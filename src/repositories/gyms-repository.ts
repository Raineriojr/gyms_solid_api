import type { Gym } from "generated/prisma/client";

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>;
}
