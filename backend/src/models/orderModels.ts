import { z } from 'zod';
import { requiredErr } from './baseModels';

const OrderPostSchema = z.object({
  price: z.number(requiredErr('price')).min(0, 'Price must be a non-negative number'),
  houseId: z.string(requiredErr('houseId')).uuid('Invalid UUID format').nonempty('House ID is required'),
  designerId: z.string(requiredErr('designerId')).uuid('Invalid UUID format').nonempty('Designer ID is required'),
  location: z.string(requiredErr('location')).nonempty('Location is required'),
}).strict();

const OrderPatchSchema = z.object({
  location: z.string(requiredErr('location')).nonempty('Location is required'),
}).strict();

export { OrderPostSchema, OrderPatchSchema };
