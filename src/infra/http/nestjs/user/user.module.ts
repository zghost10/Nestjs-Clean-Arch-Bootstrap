import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'src/application/create-user.use-case';
import { IUserRepository } from 'src/domain/user.respository';
import { UserTypeOrmRepository } from 'src/infra/db/typeorm/user-typeorm.repository';
import { ListAllUsersUseCase } from 'src/application/list-all-users.use-case';
import { DataSource } from 'typeorm';
import { User } from 'src/domain/user.entity';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { IPasswordHasher } from 'src/domain/password-hasher';
import { Argon2Hasher } from 'src/infra/hasher/argon2';

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
    }
  ],
  controllers: [UserController],
  exports: [CreateUserUseCase, ListAllUsersUseCase]
})
export class UserModule { }
