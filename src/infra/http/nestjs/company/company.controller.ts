import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCompanyUseCase } from '@application/company/create-company.use-case';
import { ListAllCompaniesUseCase } from '@application/company/list-all-companies.use-case';
import { GetCompanyUseCase } from '@application/company/get-company.use-case';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly listAllCompanyUseCase: ListAllCompaniesUseCase,
    private readonly getCompanyUseCase: GetCompanyUseCase
  ) { }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.createCompanyUseCase.execute(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.listAllCompanyUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getCompanyUseCase.execute(id);
  }
}
