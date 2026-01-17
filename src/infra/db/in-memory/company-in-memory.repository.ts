import { Company } from "@domain/company/company.entity";
import { ICompanyRepository } from "@domain/company/company.repository";

export class CompanyInMemoryRepository implements ICompanyRepository {
  companies: Company[] = [];

  async create(company: Company): Promise<void> {
    this.companies.push(company);
  }

  async findById(id: string): Promise<Company> {
    const company = this.companies.find((company) => company.id === id);
    if (!company) {
      throw new Error('Company not found');
    }
    return company;
  }

  async findAll(): Promise<Company[]> {
    return this.companies;
  }
}