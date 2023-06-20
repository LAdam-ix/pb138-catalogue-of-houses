import { z } from 'zod';
import { AccountTypeEnumeration } from '../enumTypes';
import { base64ImageSchema, requiredErr } from './baseModels';

const AccountRegistationScheme = z.object({
  email: z.string(requiredErr('email')).email('Invalid email format').nonempty('Email is required'),
  name: z.string(requiredErr('name')).nonempty('Name is required'),
  surename: z.string(requiredErr('surename')).nonempty('Surename is required'),
  password: z.string(requiredErr('password')).min(8, 'Password must be at least 8 characters').nonempty('Password is required'),
  type: z.enum(AccountTypeEnumeration,requiredErr('type')),
}).strict();

const AccountLoginScheme = z.object({
  email: z.string(requiredErr('email')).email('Invalid email format').nonempty('Email is required'),
  password: z.string(requiredErr('password')).nonempty('Password is required'),
}).strict();

const AccountPatchSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  name: z.string().optional(),
  surename: z.string().optional(),
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
