import { User } from "src/domain/user.entity";
import { IUserRepository } from "src/domain/user.respository";

export class UserInMemoryRepository implements IUserRepository {
  users: User[] = [];

  async insert(user: User): Promise<void> {
    this.users.push(user);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}