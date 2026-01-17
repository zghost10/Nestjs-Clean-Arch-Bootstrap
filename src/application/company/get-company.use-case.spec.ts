import { GetCompanyUseCase } from "./get-company.use-case";
import { CompanyInMemoryRepository } from "../../infra/db/in-memory/company-in-memory.repository";
import { Company } from "../../domain/company/company.entity";

describe('GetCompanyUseCase', () => {
  it('should get a company by id', async () => {
    const repository = new CompanyInMemoryRepository();
    const useCase = new GetCompanyUseCase(repository);
    const company = Company.create({
      name: 'Company 1',
    });
    await repository.create(company);

    const result = await useCase.execute(company.id);

    expect(result.id).toBe(company.id);
    expect(result.name).toBe(company.name);
  });
});
