import { z } from 'zod';
import { requiredErr } from './baseModels';

const score = z.number(requiredErr('score'))
  .min(0, 'Score must be a non-negative number')
  .max(5, 'Score cannot exceed 5');

const designerId = z.string(requiredErr('designerId'))
  .uuid('Invalid UUID format')
  .nonempty('Designer ID is required');

export const RatingGetMultiParamsSchema = z.object({
  designerId,
}).strict();

export const RatingCreateSchema = z.object({
  score,
  comment: z.string().optional(),
  designerId,
}).strict();

export const RatingPatchSchema = z.object({
  score: score.optional(),
  comment: z.string().optional(),
}).strict();
