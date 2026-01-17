import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CreateCompanyUseCase } from '@application/company/create-company.use-case';
import { ListAllCompaniesUseCase } from '@application/company/list-all-companies.use-case';
import { GetCompanyUseCase } from '@application/company/get-company.use-case';

describe('CompanyController', () => {
  let controller: CompanyController;
  let createCompanyUseCase: CreateCompanyUseCase;
  let listAllCompaniesUseCase: ListAllCompaniesUseCase;
  let getCompanyUseCase: GetCompanyUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CreateCompanyUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ListAllCompaniesUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetCompanyUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    createCompanyUseCase = module.get<CreateCompanyUseCase>(CreateCompanyUseCase);
    listAllCompaniesUseCase = module.get<ListAllCompaniesUseCase>(ListAllCompaniesUseCase);
    getCompanyUseCase = module.get<GetCompanyUseCase>(GetCompanyUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a company', async () => {
      const dto = {
        name: 'Company 1',
      };
      const expectedResult = {
        id: 'uuid',
        name: 'Company 1',
      };
      jest.spyOn(createCompanyUseCase, 'execute').mockResolvedValue(expectedResult);

      const result = await controller.create(dto);

      expect(result).toBe(expectedResult);
      expect(createCompanyUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const expectedResult = [
        {
          id: 'uuid',
          name: 'Company 1',
        },
      ] as any;
      jest.spyOn(listAllCompaniesUseCase, 'execute').mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toBe(expectedResult);
      expect(listAllCompaniesUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a company', async () => {
      const id = 'uuid';
      const expectedResult = {
        id,
        name: 'Company 1',
      } as any;
      jest.spyOn(getCompanyUseCase, 'execute').mockResolvedValue(expectedResult);

      const result = await controller.findOne(id);

      expect(result).toBe(expectedResult);
      expect(getCompanyUseCase.execute).toHaveBeenCalledWith(id);
    });
  });
});
