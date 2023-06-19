// Code "borrowed" from iteration 9
import type { Response } from 'express';
import type z from 'zod';
import { DeletedRecordError, DuplicateRecordError, NonexistentRecordError, WrongOwnershipError } from '../repositories/types/errors';

export function handleErrorResp(
  res: Response,
  error: Error | null,
  code?: number,
  msg?: string,
  status?: string): Response {
  if (!code) {

    switch (error?.constructor) {
      case NonexistentRecordError:
        code = 404;
        break;
      case DeletedRecordError:
        code = 410;
        break;
      case WrongOwnershipError:
        code = 403;
        break;
      case DuplicateRecordError:
        code = 409;
        break;
      default:
        code = 500;
        break;
    }
    msg = msg || (error ? error.message : 'Unknown Error');
    status = status || 'error'

  }
  return res.status(code).send({
    status: status,
    data: {},
    message: msg,
  });
}

export function handleOkResp(data: any, res: Response, msg?: string, status?: number): Response {
  return res.status(status || 200).send({
    status: 'success',
    data,
    message: msg,
  });
}

export function handleValidationErrorResp(error: z.ZodError, res: Response)
  : Response {
  console.log(error);
  return res.status(400).send({
    status: 'error',
    message: `Validation error: ${error.issues.map((issue) => issue.message).join(';')}`,
  });
}
