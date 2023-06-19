import { z } from 'zod';
import { AccountTypeEnumeration } from '../enumTypes';
import { base64ImageSchema } from './baseModels';

const IdSchema = z.object({
  id: z.string(),
});

const AccountRegistationScheme = z.object({
  email: z.string().email(),
  name: z.string(),
  surename: z.string(),
  password: z.string(),
  type: z.enum(AccountTypeEnumeration),
});

const AccountLoginScheme = z.object({
  email: z.string().email(),
  password: z.string(),
});

const AccountPatchSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  surename: z.string().optional(),
  avatar: base64ImageSchema,
  password: z.string().optional(),
  type: z.enum([
    'USER',
    'DESIGNER',
  ]),
}).strict();

export {
  IdSchema, AccountRegistationScheme, AccountLoginScheme, AccountPatchSchema,
};
