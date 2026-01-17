import { IUserRepository } from "src/domain/user.respository";

export class ListAllUsersUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) { }

  async execute(): Promise<ListOutput[]> {
    const users = await this.userRepository.findAll()
    return users.map(user => user.toJSON())
  }
}

type ListOutput = {
  id: string;
  name: string;
  email: string;
}