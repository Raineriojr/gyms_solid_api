import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function historyController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(req.params);

  const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
    userId: req.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}
