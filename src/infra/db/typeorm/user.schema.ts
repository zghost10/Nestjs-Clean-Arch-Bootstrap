import { User } from 'src/domain/user.entity';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema({
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
  },
});
