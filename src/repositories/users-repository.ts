import type { Prisma, User } from "../../generated/prisma/client";

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<Partial<User> | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
