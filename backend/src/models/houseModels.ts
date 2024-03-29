import { z } from 'zod';
import { HouseOrdering, HouseTypeEnumeration } from '../enumTypes';
import { base64ImageSchema, requiredErr } from './baseModels';

const HousePostSchema = z.object({
  name: z.string(requiredErr('name')).nonempty('Name must not be empty'),
  description: z.string(requiredErr('description')), // can be empty string
  images: z.array(base64ImageSchema).nonempty('At least one image is required'),
  price: z.number(requiredErr('price')).min(0, 'price must be a non-negative number'),
  type: z.enum(HouseTypeEnumeration, requiredErr('type')),
}).strict();

const HousePatchSchema = z.object({
  name: z.string().nonempty('Name must not be empty').optional(),
  description: z.string().optional(),
  customerId: z.string()
    .uuid('Invalid UUID format')
    .nonempty('Customer ID must not be empty')
    .optional(),
  designerId: z.string()
    .uuid('Invalid UUID format')
    .nonempty('Designer ID must not be empty')
    .optional(),
  images: z.array(base64ImageSchema),
  price: z.number().min(0, 'price must be a non-negative number').optional(),
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
  searchName: z.string().nonempty('At least one image must not be empty').optional(),
}).strict() || undefined;

export { HousePostSchema, HousePatchSchema, HouseGetMultiSchema };
