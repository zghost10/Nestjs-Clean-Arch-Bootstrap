import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CreateCompanyUseCase } from '@application/company/create-company.use-case';
import { ListAllCompaniesUseCase } from '@application/company/list-all-companies.use-case';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '@domain/company/company.entity';
import { ICompanyRepository } from '@domain/company/company.repository';
import { CompanyTypeOrmRepository } from '@infra/db/typeorm/company/company-typeorm.repository';
import { DataSource } from 'typeorm';
import { GetCompanyUseCase } from '@application/company/get-company.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
  ],
  providers: [
    {
      provide: CompanyTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new CompanyTypeOrmRepository(dataSource.getRepository(Company))
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateCompanyUseCase,
      useFactory: (repo: ICompanyRepository) => new CreateCompanyUseCase(repo),
      inject: [CompanyTypeOrmRepository],
    },
    {
      provide: ListAllCompaniesUseCase,
      useFactory: (repo: ICompanyRepository) => new ListAllCompaniesUseCase(repo),
      inject: [CompanyTypeOrmRepository],
    },
    {
      provide: GetCompanyUseCase,
      useFactory: (repo: ICompanyRepository) => new GetCompanyUseCase(repo),
      inject: [CompanyTypeOrmRepository],
    },
  ],
  controllers: [CompanyController],
  exports: [ListAllCompaniesUseCase, CreateCompanyUseCase],
})
export class CompanyModule { }
