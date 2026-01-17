import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/application/create-user.use-case';
import { IUserRepository } from 'src/domain/user.respository';
import { UserTypeOrmRepository } from 'src/infra/db/typeorm/user-typeorm.repository';
import { ListAllUsersUseCase } from 'src/application/list-all-users.use-case';
import { DataSource } from 'typeorm';
import { User } from 'src/domain/user.entity';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: UserTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(dataSource.getRepository(User));
      },
      inject: [getDataSourceToken()]
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new CreateUserUseCase(userRepository);
      },
      inject: [UserTypeOrmRepository]
    },
    {
      provide: ListAllUsersUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new ListAllUsersUseCase(userRepository);
      },
      inject: [UserTypeOrmRepository]
    }
  ],
  controllers: [UserController],
  exports: [CreateUserUseCase, ListAllUsersUseCase]
})
export class UserModule { }
