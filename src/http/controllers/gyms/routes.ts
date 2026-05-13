import type { FastifyInstance } from "fastify";

import { verifyJWt } from "../../middlewares/verify-jwt";

import { searchGymsController } from "./search.controller";
import { createController } from "./create.controller";
import { nearbyController } from "./nearby.controller";
import { verifyUserRole } from "@/http/middlewares/only-admin";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWt);

  app.get("/gyms/search", searchGymsController);
  app.get("/gyms/nearby", nearbyController);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, createController);
}
