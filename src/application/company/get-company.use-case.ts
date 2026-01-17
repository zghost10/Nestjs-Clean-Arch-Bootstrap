import { Company } from "@domain/company/company.entity";
import { ICompanyRepository } from "@domain/company/company.repository";

export class GetCompanyUseCase {
  constructor(private readonly companyRepository: ICompanyRepository) { }

  async execute(id: string): Promise<Company> {
    return await this.companyRepository.findById(id);
  }
}