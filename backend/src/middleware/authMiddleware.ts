import { Request, Response, NextFunction } from 'express';
import { AccountType } from '../enumTypes';
import { handleErrorResp } from '../utils';

const auth = (...role: AccountType[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.account) {
    return handleErrorResp(res, null, 401, 'Unauthorized');
  }
  const { type } = req.session.account;

  if (role.length > 0 && !role.includes(type)) {
    return handleErrorResp(res, null, 403, 'Forbidden');
  }

  next();
  return null;
};

export default auth;
