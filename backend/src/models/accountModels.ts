import { z } from 'zod';
import { AccountTypeEnumeration } from '../enumTypes';

// Schema for validating the ID parameter
const IdSchema = z.object({
  id: z.string(),
});

// Schema for validating the request body of POST / route
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

// Schema for validating the request body of PATCH /accounts/:id route
const AccountPatchSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  surename: z.string().optional(),
  avatar: z.string().optional(),
  password:  z.string().optional(),
  type: z.enum([
    'USER',
    'DESIGNER'
  ]),
}).strict();

export { IdSchema, AccountRegistationScheme, AccountLoginScheme, AccountPatchSchema };
