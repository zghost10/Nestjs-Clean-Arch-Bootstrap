import { Company } from "@domain/company/company.entity";
import { ICompanyRepository } from "@domain/company/company.repository";

export class ListAllCompaniesUseCase {
  constructor(private readonly repo: ICompanyRepository) { }

  async execute(): Promise<Company[]> {
    return await this.repo.findAll();
  }
}