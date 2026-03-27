import { hash } from "bcrypt";

import type { IUsersRepository } from "@/repositories/users-repository";
import { UserAlreadyEmailExistsError } from "./errors/user-already-email-exists-error";

interface IRegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, name, password }: IRegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyEmailExistsError();
    }

    const password_hash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
