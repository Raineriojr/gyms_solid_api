import fastify from "fastify";
import z, { ZodError } from "zod";

import { appRoutes } from "./http/routes";
import { env } from "../env.schema";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: z.treeifyError(error) });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // implements monitoring
  }

  return reply.status(500).send({ message: "Internal server error" });
});
