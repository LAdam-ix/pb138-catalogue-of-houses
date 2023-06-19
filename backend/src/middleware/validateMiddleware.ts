// Code "borrowed" from iteration 9
import type { RequestHandler } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { handleErrorResp, handleValidationErrorResp } from '../utils/handleResponse';

type Validations<TParams, TBody, TQuery> = {
  params?: ZodSchema<TParams>;
  body?: ZodSchema<TBody>;
  query?: ZodSchema<TQuery>;
};

const validate = <TParams = unknown, TBody = unknown, TQuery = unknown>
  (
    validation: Validations<TParams, TBody, TQuery>,
  ): RequestHandler<TParams, any, TBody, TQuery> => async (req, res, next) => {
    try {
      if (validation.body) req.body = validation.body.parse(req.body);
      if (validation.params) req.params = validation.params.parse(req.params);
      console.log(req.query);
      if (validation.query) req.query = validation.query.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return handleValidationErrorResp(error, res);
      }
      return handleErrorResp(res, null, 500, `Unknown error ${error}`);
    }
    return null;
  };

export default validate;
