import { z } from 'zod';
import { HouseOrdering, HouseTypeEnumeration } from '../enumTypes';
import { base64ImageSchema } from './baseModels';

const HousePostSchema = z.object({
  name: z.string(),
  description: z.string(),
  images: z.array(base64ImageSchema),
  cost: z.number(),
  type: z.enum(HouseTypeEnumeration),
}).strict();

const HousePatchSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  customerId: z.string().optional(),
  designerId: z.string().optional(),
  images: z.array(base64ImageSchema),
  cost: z.number().optional(),
  type: z.enum(HouseTypeEnumeration).optional(),
}).strict();

const HouseGetMultiSchema = z.object({
  type: z.enum(HouseTypeEnumeration).optional(),
  orderBy: z.enum(HouseOrdering).optional(),
  orderDirection: z.enum(['asc', 'desc']).optional(),
  minPrice: z.string().refine((val) => parseFloat(val) > 0, {
    message: 'MinPrice must be a positive number',
  }).optional(),
  maxPrice: z.string().refine((val) => parseFloat(val) > 0, {
    message: 'MaxPrice must be a positive number',
  }).optional(),
}).strict() || undefined;

export { HousePostSchema, HousePatchSchema, HouseGetMultiSchema };
