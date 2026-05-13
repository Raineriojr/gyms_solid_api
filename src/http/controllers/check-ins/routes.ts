import type { FastifyInstance } from "fastify";

import { verifyJWt } from "../../middlewares/verify-jwt";

import { createController } from "./create.controller";
import { validateController } from "./validate.controller";
import { historyController } from "./history.controller";
import { metricsController } from "./metrics.controller";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWt);

  app.get("/check-ins/history", historyController);
  app.get("/check-ins/metrics", metricsController);

  app.post("/gyms/:gymId/check-ins", createController);
  app.patch("/check-ins/:checkInId/validate", validateController);
}
