import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '@application/user/create-user.use-case';
import { ListAllUsersUseCase } from '@application/user/list-all-users.use-case';
import { AddUserToCompanyUseCase } from '@application/user/add-user-to-company';
import { GetUserUseCase } from '@application/user/get-user.user-case';

describe('UserController', () => {
  let controller: UserController;
  let createUserUseCase: CreateUserUseCase;
  let findAllUsersUseCase: ListAllUsersUseCase;
  let addUserToCompanyUseCase: AddUserToCompanyUseCase;
  let findOneUserUseCase: GetUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ListAllUsersUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: AddUserToCompanyUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    findAllUsersUseCase = module.get<ListAllUsersUseCase>(ListAllUsersUseCase);
    addUserToCompanyUseCase = module.get<AddUserToCompanyUseCase>(AddUserToCompanyUseCase);
    findOneUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };
      const expectedResult = {
        id: 'uuid',
        ...dto,
        companyId: null,
      };
      jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(expectedResult);

      const result = await controller.create(dto);

      expect(result).toBe(expectedResult);
      expect(createUserUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedResult = [
        {
          id: 'uuid',
          name: 'John Doe',
          email: 'john@example.com',
          companyId: null,
        },
      ];
      jest.spyOn(findAllUsersUseCase, 'execute').mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toBe(expectedResult);
      expect(findAllUsersUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const id = 'uuid';
      const expectedResult = {
        id,
        name: 'John Doe',
        email: 'john@example.com',
        companyId: null,
      };
      jest.spyOn(findOneUserUseCase, 'execute').mockResolvedValue(expectedResult);

      const result = await controller.findOne(id);

      expect(result).toBe(expectedResult);
      expect(findOneUserUseCase.execute).toHaveBeenCalledWith(id);
    });
  });

  describe('addUserToCompany', () => {
    it('should add a user to a company', async () => {
      const companyId = 'company-uuid';
      const userId = 'user-uuid';
      const expectedResult = {
        id: userId,
        name: 'John Doe',
        companyId,
      };
      jest.spyOn(addUserToCompanyUseCase, 'execute').mockResolvedValue(expectedResult);

      const result = await controller.addUserToCompany(companyId, userId);

      expect(result).toBe(expectedResult);
      expect(addUserToCompanyUseCase.execute).toHaveBeenCalledWith({ companyId, userId });
    });
  });
});
