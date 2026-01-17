import { ListAllCompaniesUseCase } from "./list-all-companies.use-case";
import { CompanyInMemoryRepository } from "../../infra/db/in-memory/company-in-memory.repository";
import { Company } from "../../domain/company/company.entity";

describe('ListAllCompaniesUseCase', () => {
  it('should list all companies', async () => {
    const repository = new CompanyInMemoryRepository();
    const useCase = new ListAllCompaniesUseCase(repository);
    const company1 = Company.create({ name: 'Company 1' });
    const company2 = Company.create({ name: 'Company 2' });
    await repository.create(company1);
    await repository.create(company2);

    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result.map(c => c.id)).toContain(company1.id);
    expect(result.map(c => c.id)).toContain(company2.id);
  });
});
