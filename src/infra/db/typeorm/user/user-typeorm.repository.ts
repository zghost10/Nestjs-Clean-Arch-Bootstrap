import { User } from "@domain/user/user.entity";
import { IUserRepository } from "@domain/user/user.respository";
import { Repository } from "typeorm";

export class UserTypeOrmRepository implements IUserRepository {
  constructor(private readonly ormRepo: Repository<User>) { }

  public findAll(): Promise<User[]> {
    // const list = await this.ormRepo.query(`
    //   SELECT * FROM user
    // `);
    // const users = list.map(user => User.create(user));
    return this.ormRepo.find();
  }

  public async findById(identifier: string): Promise<User> {
    const user = await this.ormRepo.findOne({ where: [{ id: identifier }, { email: identifier }] });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async insert(user: User): Promise<void> {
    await this.ormRepo.save(user);
  }

  public async addToCompany(companyId: string, userId: string): Promise<void> {
    await this.ormRepo.update(userId, { companyId });
  }
}