import { z } from 'zod';

export const RatingGetMultiParamsSchema = z.object({
  designerId: z.string(),
}).strict();

export const RatingCreateSchema = z.object({
  score: z.number().min(0).max(10),
  comment: z.string().optional(),
  designerId: z.string(),
}).strict();

export const RatingPatchSchema = z.object({
  score: z.number().min(0).max(10).optional(),
  comment: z.string().optional(),
}).strict();
