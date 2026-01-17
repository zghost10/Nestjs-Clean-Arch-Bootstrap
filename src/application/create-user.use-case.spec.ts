import { CreateUserUseCase } from "./create-user.use-case";
import { UserInMemoryRepository } from "../infra/db/in-memory/user-in-memory.repository";
import { PasswordHasherInMemory } from "../infra/hasher/in-memory/password-hasher-in-memory";

describe('CreateUserUseCase', () => {
  it('should create an user', async () => {
    const repository = new UserInMemoryRepository();
    const hasher = new PasswordHasherInMemory();
    const useCase = new CreateUserUseCase(repository, hasher);
    const input = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password',
    };
    const result = await useCase.execute(input);
    expect(repository.users).toHaveLength(1);
    expect(result).toStrictEqual({
      id: repository.users[0].id,
      name: input.name,
      email: input.email,
    });

    const expectedHash = 'password_hashed';
    expect(repository.users[0].password).toBe(expectedHash);
  });
});