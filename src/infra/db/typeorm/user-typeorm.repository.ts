import { User } from "src/domain/user.entity";
import { IUserRepository } from "src/domain/user.respository";
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

  public async insert(user: User): Promise<void> {
    await this.ormRepo.save(user);
  }
}