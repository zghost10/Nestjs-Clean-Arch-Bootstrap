import { ListAllUsersUseCase } from "./list-all-users.use-case";
import { UserInMemoryRepository } from "../../infra/db/in-memory/user-in-memory.repository";
import { User } from "../../domain/user/user.entity";

describe('ListAllUsersUseCase', () => {
  it('should list all users', async () => {
    const repository = new UserInMemoryRepository();
    const useCase = new ListAllUsersUseCase(repository);
    const user1 = User.create({
      name: 'User 1',
      email: 'user1@example.com',
      password: 'password',
    });
    const user2 = User.create({
      name: 'User 2',
      email: 'user2@example.com',
      password: 'password',
    });
    await repository.insert(user1);
    await repository.insert(user2);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      id: user1.id,
      name: user1.name,
      email: user1.email,
      companyId: null,
      createdAt: user1.createdAt,
      updatedAt: user1.updatedAt,
    });
    expect(result).toContainEqual({
      id: user2.id,
      name: user2.name,
      email: user2.email,
      companyId: null,
      createdAt: user2.createdAt,
      updatedAt: user2.updatedAt,
    });
  });
});
