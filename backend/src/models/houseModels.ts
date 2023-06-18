import { z } from 'zod';
import { HouseOrdering, HouseTypeEnumeration } from '../enumTypes';

// Schema for validating the request body of POST /orders route
const HousePostSchema = z.object({
  name: z.string(),
  description: z.string(),
  pictureLink: z.string(),  // Add pictureLink property
  modelLink: z.string(),    // Add modelLink property
  cost: z.number(),
  type: z.enum(HouseTypeEnumeration),         
}).strict();;

// Schema for validating the request body of PATCH /orders/:id route
const HousePatchSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  customerId: z.string().optional(),
  designerId: z.string().optional(),
  cost: z.number().optional(),
  type: z.enum(HouseTypeEnumeration).optional(),
}).strict();;


const HouseGetMultiSchema = z.object({
  type: z.enum(HouseTypeEnumeration).optional(),
  orderBy: z.enum(HouseOrdering).optional(),
  orderDirection: z.enum(['asc', 'desc']).optional(),
  minPrice: z.string().refine((val) => parseFloat(val) > 0, {
    message: 'MinPrice must be a positive number',  }).optional(),
  maxPrice: z.string().refine((val) => parseFloat(val) > 0, {
    message: 'MaxPrice must be a positive number',  }).optional(),
}).strict()|| undefined;


export { HousePostSchema, HousePatchSchema, HouseGetMultiSchema };
