import { CreateUserUseCase } from "./create-user.use-case";
import { UserInMemoryRepository } from "../infra/db/in-memory/user-in-memory.repository";
import { Argon2Hasher } from "../infra/hasher/argon2";

describe('CreateUserUseCase', () => {
  it('should create an user', async () => {
    const repository = new UserInMemoryRepository();
    const hasher = new Argon2Hasher();
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
    expect(hasher.verify(repository.users[0].password, input.password)).resolves.toBe(true);
  });
});