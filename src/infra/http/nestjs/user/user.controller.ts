import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ListAllUsersUseCase } from '@application/user/list-all-users.use-case';
import { CreateUserUseCase } from '@application/user/create-user.use-case';
import { AddUserToCompanyUseCase } from '@application/user/add-user-to-company';
import { GetUserUseCase } from '@application/user/get-user.user-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly findAllUsersUseCase: ListAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly addUserToCompanyUseCase: AddUserToCompanyUseCase,
    private readonly findOneUserUseCase: GetUserUseCase
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.findAllUsersUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneUserUseCase.execute(id);
  }

  @Put(':userId/join-company/:companyId')
  addUserToCompany(@Param('companyId') companyId: string, @Param('userId') userId: string) {
    return this.addUserToCompanyUseCase.execute({ companyId, userId });
  }
}
