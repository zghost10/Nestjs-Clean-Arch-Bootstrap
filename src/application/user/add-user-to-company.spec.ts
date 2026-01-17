import { AddUserToCompanyUseCase } from "./add-user-to-company";
import { UserInMemoryRepository } from "../../infra/db/in-memory/user-in-memory.repository";
import { User } from "../../domain/user/user.entity";

describe('AddUserToCompanyUseCase', () => {
  it('should add user to a company', async () => {
    const repository = new UserInMemoryRepository();
    const useCase = new AddUserToCompanyUseCase(repository);
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });
    await repository.insert(user);
    const companyId = 'company-uuid';

    const result = await useCase.execute({
      userId: user.id,
      companyId,
    });

    expect(result).toStrictEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      companyId: companyId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    const updatedUser = await repository.findById(user.id);
    expect(updatedUser.companyId).toBe(companyId);
  });
});
