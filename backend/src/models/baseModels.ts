import z from 'zod';

export const ParamsWithIdSchema = z.object({
  id: z.string({ required_error: 'Missing `id` in url parameters' }).nonempty(),
}).strict();

export const base64ImageSchema = z.string().refine((value) => {
  if (typeof value !== 'string') return false;
  const base64Regex = /^data:image\/(png|jpeg);base64,/i;
  return base64Regex.test(value);
}, {
  message: 'Invalid base64 image',
});
