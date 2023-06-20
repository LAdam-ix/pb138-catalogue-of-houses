import { z } from 'zod';
import { requiredErr } from './baseModels';

const OrderPostSchema = z.object({
  price: z.number(requiredErr('price')).min(0, 'Price must be a non-negative number'),
  houseId: z.string(requiredErr('houseId'))
    .uuid('Invalid UUID format')
    .nonempty('House ID must not be empty'),
  designerId: z.string(requiredErr('designerId'))
    .uuid('Invalid UUID format')
    .nonempty('Designer ID must not be empty'),
  location: z.string(requiredErr('location')).nonempty('Location must not be empty'),
}).strict();

const OrderPatchSchema = z.object({
  location: z.string(requiredErr('location')).nonempty('Location must not be empty'),
}).strict();

export { OrderPostSchema, OrderPatchSchema };
