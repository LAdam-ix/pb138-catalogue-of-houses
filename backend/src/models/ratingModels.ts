import { z } from 'zod';


export const RatingGetMultiParamsSchema = z.object({
    designerId: z.string(),

}).strict();;

// RatingCreateSchema
export const RatingCreateSchema = z.object({
    score: z.number().min(0).max(10),
    comment: z.string().optional(),
    designerId: z.string(),

    // Other properties for rating creation
}).strict();;

// RatingPatchSchema
export const RatingPatchSchema = z.object({
    score: z.number().min(0).max(10).optional(),
    comment: z.string().optional(),
    // Other properties for rating update

}).strict();;

