import { User } from "./user.entity";

export interface IUserRepository {
  findAll(): Promise<User[]>
  insert(user: User): Promise<void>
}