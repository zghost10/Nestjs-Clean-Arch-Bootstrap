import { Company } from "./company.entity";

describe('Company Entity', () => {
  const props = {
    name: 'Company 1',
  };

  it('should create a new company with generated ID', () => {
    const company = Company.create(props);

    expect(company).toBeInstanceOf(Company);
    expect(company.id).toBeDefined(); // Garante que o ID foi gerado
    expect(company.name).toBe(props.name);
    expect(company.createdAt).toBeDefined();
    expect(company.updatedAt).toBeDefined();
  });

  it('should create a company with provided ID', () => {
    const id = 'some-uuid';
    const company = Company.create(props, id);

    expect(company.id).toBe(id);
    expect(company.createdAt).toBeDefined();
    expect(company.updatedAt).toBeDefined();
  });

  it('should update company properties', () => {
    const company = Company.create(props);

    company.name = 'Company 2';

    expect(company.name).toBe('Company 2');
  });

  it('should convert to JSON correctly', () => {
    const company = Company.create(props);

    expect(company.toJSON()).toStrictEqual({
      id: company.id,
      name: props.name,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
    });
  });
});