import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ListAllUsersUseCase } from 'src/application/list-all-users.use-case';
import { CreateUserUseCase } from 'src/application/create-user.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly findAllUsersUseCase: ListAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.findAllUsersUseCase.execute();
  }
}
