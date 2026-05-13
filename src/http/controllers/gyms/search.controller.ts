import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function searchGymsController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page, query } = searchGymsQuerySchema.parse(req.params);

  const createGymUseCase = makeSearchGymsUseCase();

  const { gyms } = await createGymUseCase.execute({
    page,
    query,
  });

  return reply.status(201).send({
    gyms,
  });
}
