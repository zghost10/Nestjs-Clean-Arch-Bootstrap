import { IUserRepository } from "@domain/user/user.respository";

export class AddUserToCompanyUseCase {
  constructor(private readonly repo: IUserRepository) { }

  async execute({ companyId, userId }: AddUserToCompanyInput): Promise<AddUserToCompanyOutput> {
    await this.repo.addToCompany(companyId, userId);
    const output = await this.repo.findById(userId);
    return output.toJSON();
  }
}

type AddUserToCompanyInput = {
  companyId: string;
  userId: string;
}

type AddUserToCompanyOutput = {
  id: string;
  name: string;
  companyId: string | null;
}
