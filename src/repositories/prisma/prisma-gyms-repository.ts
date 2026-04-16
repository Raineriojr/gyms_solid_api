import type { GymCreateInput } from "generated/prisma/models";
import type {
  IFindManyNearbyParams,
  IGymsRepository,
} from "../gyms-repository";
import { prisma } from "@/lib/prisma";
import type { Gym } from "generated/prisma/client";

export class PrismaGymsRepository implements IGymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }
  async searchMany(query: string, page: number) {
    const currentPage = page ?? 1;

    const gym = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (currentPage - 1) * 20,
    });

    return gym;
  }

  async findManyNearby({ latitude, longitude }: IFindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
   
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`;

    return gyms;
  }

  async create(data: GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }
}
