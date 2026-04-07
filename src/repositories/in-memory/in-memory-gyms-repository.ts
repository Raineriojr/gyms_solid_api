import type { Gym } from "generated/prisma/client";

import type { IGymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements IGymsRepository {
  gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
