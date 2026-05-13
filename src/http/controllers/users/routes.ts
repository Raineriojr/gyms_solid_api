import type { FastifyInstance } from "fastify";
import { registerController } from "./register.controller";
import { authenticateController } from "./authenticate.controller";
import { profileController } from "./profile.controller";
import { verifyJWt } from "../../middlewares/verify-jwt";
import { refreshController } from "./refresh.controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);

  app.patch("/token/refresh", refreshController);
  /** Authenticated */
  app.get("/me", { onRequest: [verifyJWt] }, profileController);
}
