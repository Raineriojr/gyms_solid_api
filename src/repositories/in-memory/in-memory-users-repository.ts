import { randomUUID } from "node:crypto";
import type { User } from "../../../generated/prisma/client";
import type { UserCreateInput } from "../../../generated/prisma/models";

import type { IUsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
    };

    this.users.push(user);

    return user;
  }
}
