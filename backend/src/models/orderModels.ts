import { z } from 'zod';

const OrderPostSchema = z.object({
  price: z.number(),
  houseId: z.string(),
  designerId: z.string(),
  location: z.string(),
}).strict();

const OrderPatchSchema = z.object({
  location: z.string(),
}).strict();

export { OrderPostSchema, OrderPatchSchema };
