import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { RegisterUseCase } from "@/use-cases/register-use-case";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyEmailExistsError } from "@/use-cases/errors/user-already-email-exists-error";

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
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({ email, name, password });
  } catch (error) {
    if (error instanceof UserAlreadyEmailExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }

  return reply.status(201).send();
}
