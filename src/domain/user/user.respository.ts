import { User } from "./user.entity";

export interface IUserRepository {
  findAll(): Promise<User[]>
  findById(id: string): Promise<User>
  insert(user: User): Promise<void>
  addToCompany(companyId: string, userId: string): Promise<void>
}