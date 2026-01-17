import { User } from "@domain/user/user.entity";
import { IUserRepository } from "@domain/user/user.respository";

export class UserInMemoryRepository implements IUserRepository {
  users: User[] = [];

  async insert(user: User): Promise<void> {
    this.users.push(user);
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(u => u.id === id || u.email === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async addToCompany(companyId: string, userId: string): Promise<void> {
    const user = this.users.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.companyId = companyId;
  }
}