import { CreateCompanyUseCase } from "@application/company/create-company.use-case";
import { CompanyInMemoryRepository } from "@infra/db/in-memory/company-in-memory.repository";

describe('CreateCompanyUseCase', () => {
  it('should create an company', async () => {
    const repository = new CompanyInMemoryRepository();
    const useCase = new CreateCompanyUseCase(repository);
    const input = {
      name: 'Company 1',
    };
    const result = await useCase.execute(input);
    expect(repository.companies).toHaveLength(1);
    expect(result).toStrictEqual({
      id: repository.companies[0].id,
      name: input.name,
      createdAt: repository.companies[0].createdAt,
      updatedAt: repository.companies[0].updatedAt,
    });
  });
});