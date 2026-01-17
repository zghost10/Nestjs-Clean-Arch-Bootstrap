import { Company } from "@domain/company/company.entity";
import { ICompanyRepository } from "@domain/company/company.repository";

export class CreateCompanyUseCase {
  constructor(private readonly repo: ICompanyRepository) { }

  async execute(input: companyInput): Promise<companyOutput> {
    const company = Company.create(input);
    await this.repo.create(company);
    return company.toJSON();
  }
}

type companyInput = {
  name: string;
}

type companyOutput = {
  id: string;
  name: string;
}
