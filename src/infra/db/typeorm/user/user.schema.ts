import { User } from '@domain/user/user.entity';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    name: {
      type: 'varchar',
      length: 255,
    },
    email: {
      type: 'varchar',
      unique: true,
      length: 255,
    },
    password: {
      type: 'varchar',
      length: 255,
    },
    companyId: {
      type: 'uuid',
      nullable: true,
    },
    createdAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP',
      nullable: true,
    },
    updatedAt: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
      nullable: true,
    },
  },
  relations: {
    company: {
      type: 'many-to-one',
      target: 'Company',
      joinColumn: { name: 'companyId' },
    },
  },
});
