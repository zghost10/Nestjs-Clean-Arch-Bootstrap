import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '@application/user/create-user.use-case';
import { IUserRepository } from '@domain/user/user.respository';
import { UserTypeOrmRepository } from '@infra/db/typeorm/user/user-typeorm.repository';
import { ListAllUsersUseCase } from '@application/user/list-all-users.use-case';
import { DataSource } from 'typeorm';
import { User } from '@domain/user/user.entity';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { IPasswordHasher } from '@domain/password-hasher';
import { Argon2Hasher } from '@infra/hasher/argon2';
import { GetUserUseCase } from '@application/user/get-user.user-case';
import { AddUserToCompanyUseCase } from '@application/user/add-user-to-company';

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
      provide: Argon2Hasher,
      useClass: Argon2Hasher
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: IUserRepository, passwordHasher: IPasswordHasher) => {
        return new CreateUserUseCase(userRepository, passwordHasher);
      },
      inject: [UserTypeOrmRepository, Argon2Hasher]
    },
    {
      provide: ListAllUsersUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new ListAllUsersUseCase(userRepository);
      },
      inject: [UserTypeOrmRepository]
    },
    {
      provide: GetUserUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new GetUserUseCase(userRepository);
      },
      inject: [UserTypeOrmRepository]
    },
    {
      provide: AddUserToCompanyUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new AddUserToCompanyUseCase(userRepository);
      },
      inject: [UserTypeOrmRepository]
    }
  ],
  controllers: [UserController],
  exports: [CreateUserUseCase, ListAllUsersUseCase]
})
export class UserModule { }
