import { Company } from "./company.entity";

export interface ICompanyRepository {
  create(company: Company): Promise<void>;
  findAll(): Promise<Company[]>;
  findById(id: string): Promise<Company>;
}