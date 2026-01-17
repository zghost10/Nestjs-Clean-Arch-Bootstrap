import { IPasswordHasher } from "src/domain/password-hasher";
import { User } from "src/domain/user.entity";
import { IUserRepository } from "src/domain/user.respository";

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
}