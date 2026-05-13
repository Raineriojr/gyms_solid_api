import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { makeCheckInsUseCase } from "@/use-cases/factories/make-check-ins-use-case";

export async function createController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInParamsSchema = z.object({
    gymId: z.uuid(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = createCheckInParamsSchema.parse(req.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(req.body);

  const createGymUseCase = makeCheckInsUseCase();

  await createGymUseCase.execute({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
}
