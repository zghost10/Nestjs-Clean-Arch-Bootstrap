import { IPasswordHasher } from "@domain/password-hasher";
import { User } from "@domain/user/user.entity";
import { IUserRepository } from "@domain/user/user.respository";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher
  ) { }

  async execute(userInput: UserInput): Promise<UserOutput> {
    const props = {
      ...userInput,
      password: await this.passwordHasher.hash(userInput.password)
    }
    const user = User.create(props);
    await this.userRepository.insert(user);
    return user.toJSON();
  }
}

type UserInput = {
  name: string;
  email: string;
  password: string;
}

type UserOutput = {
  id: string;
  name: string;
  email: string;
  companyId: string | null;
}