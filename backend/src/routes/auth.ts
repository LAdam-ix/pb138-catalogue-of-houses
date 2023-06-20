import { Router } from 'express';
import argon2 from 'argon2';
import { AccountType } from '../enumTypes';
import { AccountLoginScheme, AccountRegistationScheme } from '../models/accountModels';
import auth from '../middleware/authMiddleware';
import client from '../client';
import { AccountRepository } from '../repositories';
import { handleErrorResp } from '../utils';
import validate from '../middleware/validateMiddleware';

const authRouter = Router();

// taken from auth demo
/**
 * This endpoint provides information about the currenct authentication.
 * If the user is authorized it returns the user entity. If there is
 * invalid cookie or missing cookie, it return 401.
 */
// GET /auth/
// AUTH Logged in
authRouter.get('/', auth(), async (req, res) => {
  const result = await AccountRepository.getSingle({ id: req.session.account!.id });

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  const account = result.value;
  if (!account) {
    res.status(404).json({ message: 'Account does not exist!' });
  }
  res.json({ item: account, message: `User ${account.name} ${account.surname} is authorized` });
  return null;
});

/**
 * It gets the user email, password and other user attributes and returns
 * register user in the application.
 */
// GET /registration/
// NO AUTH
authRouter.post('/registration', validate({ body: AccountRegistationScheme }), async (req, res) => {
  const { password, email, ...userData } = req.body;
  const hash = await argon2.hash(password);
  const result = await AccountRepository.createSingle(
    {
      ...userData,
      email: email.toLowerCase(),
      hashedPassword: hash,
    },
  );

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }

  const account = result.value;

  res.json({ item: account, message: `User ${account.name} ${account.surname} was registered` });
  return null;
});

/**
 * This endpoint after successful password verification add the user and
 * role to session stroge.
 */
// post /login/
// NO AUTH
authRouter.post('/login', validate({ body: AccountLoginScheme }), async (req, res) => {
  const { email, password } = req.body;
  const account = await client.account.findUnique({ where: { email: email.toLowerCase() } });

  if (!account) {
    return handleErrorResp(res, null, 404, 'User does not exists');
  }

  const isVerified = await argon2.verify(account.hashedPassword, password);

  if (!isVerified) {
    return handleErrorResp(res, null, 401, 'Wrong password');
  }

  req.session.account = { id: account.id, type: account.type as AccountType };
  res.json({ message: 'Logged in' });
  return null;
});

/**
 * Remove the authorized user from session storage.
 */
// POST /logout/
// AUTH Logged in
authRouter.post('/logout', auth(), async (req, res) => {
  req.session.destroy(() => { });
  res.json({ message: 'Logged out' });
});

export default authRouter;
