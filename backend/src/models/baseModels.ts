import z from 'zod';

export const ParamsWithIdSchema = z.object({
  id: z.string().uuid('Invalid UUID format').nonempty('ID is required'),
}).strict();

export const base64ImageSchema = z.string().refine((value) => {
  if (typeof value !== 'string') return false;
  const base64Regex = /^data:image\/(png|jpeg);base64,/i;
  return base64Regex.test(value);
}, {
  message: 'Invalid base64 image',
});

export const requiredErr = (fieldName: string) => ({
  required_error: `Property \`${fieldName}\` is required`,
});