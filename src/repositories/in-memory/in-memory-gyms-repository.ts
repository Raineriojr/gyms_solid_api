import { randomUUID } from "node:crypto";
import { Prisma, type Gym } from "generated/prisma/client";

import type { IGymsRepository } from "@/repositories/gyms-repository";

export class InMemoryGymsRepository implements IGymsRepository {
  gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gyms: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.gyms.push(gyms);

    return gyms;
  }
}
