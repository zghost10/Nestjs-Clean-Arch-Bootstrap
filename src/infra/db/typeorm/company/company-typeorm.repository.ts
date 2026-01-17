import { Company } from "@domain/company/company.entity";
import { ICompanyRepository } from "@domain/company/company.repository";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";

export class CompanyTypeOrmRepository implements ICompanyRepository {
  constructor(private readonly ormRepo: Repository<Company>) { }

  async create(company: Company): Promise<void> {
    try {
      await this.ormRepo.save(company);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException("Company already exists");
      }
      throw error;
    }
  }

  async findById(id: string): Promise<Company> {
    const company = await this.ormRepo.findOneBy({ id });
    if (!company) {
      throw new NotFoundException("Company not found");
    }
    return company;
  }

  async findAll(): Promise<Company[]> {
    return await this.ormRepo.find();
  }
}