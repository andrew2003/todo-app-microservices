import { z } from 'zod';

import { BaseEntity } from '../../utils/entity';
import {
  UserPasswordEntity,
  UserPasswordEntitySchema,
} from './user_password.entity';

const ID = z.string().uuid();
const Email = z.string().email();
const Password = UserPasswordEntitySchema;

const CreatedAt = z.date().nullish();
const UpdatedAt = z.date().nullish();
const DeletedAt = z.date().nullish();

export const UserEntitySchema = z.object({
  id: ID,
  email: Email,
  password: Password.optional(),

  createdAt: CreatedAt,
  updatedAt: UpdatedAt,
  deletedAt: DeletedAt,
});

type User = z.infer<typeof UserEntitySchema>;

export class UserEntity extends BaseEntity<UserEntity>() {
  name!: string;

  email!: string;

  password!: UserPasswordEntity;

  constructor(entity: User) {
    super(UserEntitySchema);
    Object.assign(this, this.validate(entity));
  }
}
