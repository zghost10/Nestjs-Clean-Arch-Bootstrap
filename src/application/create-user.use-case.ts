import { User } from "src/domain/user.entity";
import { IUserRepository } from "src/domain/user.respository";

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) { }

  async execute(userInput: UserInput): Promise<UserOutput> {
    const user = User.create(userInput);
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