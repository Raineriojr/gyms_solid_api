import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { UserAlreadyEmailExistsError } from "@/use-cases/errors/user-already-email-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function registerController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({ email, name, password });
  } catch (error) {
    if (error instanceof UserAlreadyEmailExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send();
}
