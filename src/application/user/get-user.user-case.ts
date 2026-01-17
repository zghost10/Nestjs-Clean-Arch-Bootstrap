import { IUserRepository } from "@domain/user/user.respository";

export class GetUserUseCase {
  constructor(private readonly repo: IUserRepository) { }

  async execute(identifier: string): Promise<UserOutput> {
    const user = await this.repo.findById(identifier);
    return user.toJSON();
  }
}

type UserOutput = {
  id: string;
  name: string;
  email: string;
  companyId: string | null;
}
