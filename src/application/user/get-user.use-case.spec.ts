import { GetUserUseCase } from "./get-user.user-case";
import { UserInMemoryRepository } from "../../infra/db/in-memory/user-in-memory.repository";
import { User } from "../../domain/user/user.entity";

describe('GetUserUseCase', () => {
  it('should get a user by id', async () => {
    const repository = new UserInMemoryRepository();
    const useCase = new GetUserUseCase(repository);
    const user = User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
    });
    await repository.insert(user);

    const result = await useCase.execute(user.id);

    expect(result).toStrictEqual({
      id: user.id,
      name: user.name,
      email: user.email,
      companyId: null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  });
});
