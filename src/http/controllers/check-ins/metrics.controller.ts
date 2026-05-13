import type { FastifyReply, FastifyRequest } from "fastify";

import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";

export async function metricsController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchUserCheckInHistoryUseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await fetchUserCheckInHistoryUseCase.execute({
    userId: req.user.sub,
  });

  return reply.status(200).send({
    checkInsCount,
  });
}
