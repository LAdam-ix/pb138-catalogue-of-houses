// Code "borrowed" from iteration 9
import type { Response } from 'express';
import type z from 'zod';
import {
  DeletedRecordError,
  DuplicateRecordError,
  NonexistentRecordError,
  WrongOwnershipError,
} from '../repositories/types/errors';

export function handleErrorResp(
  res: Response,
  error: Error | null,
  code?: number,
  msg?: string,
  responseStatus?: string,
): Response {
  let statusCode = code;
  let message = msg;
  let status = responseStatus;

  if (!statusCode) {
    switch (error?.constructor) {
      case NonexistentRecordError:
        statusCode = 404;
        break;
      case DeletedRecordError:
        statusCode = 410;
        break;
      case WrongOwnershipError:
        statusCode = 403;
        break;
      case DuplicateRecordError:
        statusCode = 409;
        break;
      default:
        statusCode = 500;
        break;
    }

    message = message || (error ? error.message : 'Unknown Error');
    status = status || 'error';
  }

  return res.status(statusCode).send({
    status,
    data: {},
    message,
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
  return res.status(400).send({
    status: 'error',
    message: `Validation error: ${error.issues.map((issue) => issue.message).join(';')}`,
  });
}
