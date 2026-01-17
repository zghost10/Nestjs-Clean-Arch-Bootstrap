import { Company } from "@domain/company/company.entity";
import { EntitySchema } from "typeorm";

export const CompanySchema = new EntitySchema({
  name: 'Company',
  target: Company,
  columns: {
    id: {
      type: 'uuid',
      primary: true
    },
    name: {
      type: 'varchar',
      length: 255,
    },
    createdAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
    updatedAt: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    },
  },
});