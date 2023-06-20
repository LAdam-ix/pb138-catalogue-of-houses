import { z } from 'zod';
import { AccountTypeEnumeration } from '../enumTypes';
import { base64ImageSchema, requiredErr } from './baseModels';

const AccountRegistationScheme = z.object({
  email: z.string(requiredErr('email')).email('Invalid email format').nonempty('Email must not be empty'),
  name: z.string(requiredErr('name')).nonempty('Name must not be empty'),
  surname: z.string(requiredErr('surname')).nonempty('Surname must not be empty'),
  password: z.string(requiredErr('password')).min(8, 'Password must be at least 8 characters').nonempty('Password must not be empty'),
  type: z.enum(AccountTypeEnumeration,requiredErr('type')),
}).strict();

const AccountLoginScheme = z.object({
  email: z.string(requiredErr('email')).email('Invalid email format').nonempty('Email must not be empty'),
  password: z.string(requiredErr('password')).nonempty('Password must not be empty'),
}).strict();

const AccountPatchSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  name: z.string().nonempty('Name must not be empty').optional(),
  surname: z.string().nonempty('Surname must not be empty').optional(),
  avatar: base64ImageSchema.optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
  type: z.enum([
    'USER',
    'DESIGNER',
  ]).optional(),
}).strict();

export {
  AccountRegistationScheme, AccountLoginScheme, AccountPatchSchema,
};
