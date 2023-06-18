import express from 'express';
import validate from '../middleware/validateMiddleware';
import auth from '../middleware/authMiddleware';
import argon2 from 'argon2';

import { AccountRepository } from '../repositories';
import { ParamsWithIdSchema } from '../models/baseModels';
import { handleErrorResp, handleOkResp } from '../utils/handleResponse';
import { AccountPatchSchema } from '../models';
import { deleteSingle, updateSingle } from '../repositories/accountRepositary';

const router = express.Router();

// GET /accounts/:id
router.get('/:id', validate({ params: ParamsWithIdSchema }), async (req, res) => {
  const accountId = req.params.id;
  const result = await AccountRepository.getSingle({ id: accountId });
  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp(result.value, res, 'Account retrieved successfully');
});


// PATCH /accounts/:id
router.patch('/:id', validate({ params: ParamsWithIdSchema, body: AccountPatchSchema }), auth(), async (req, res) => {
  const accountId = req.params.id;
  const { password, ...rest } = req.body;
  // Check ownership of the account
  if (req.session.account && accountId !== req.session.account.id) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }
  let hashedPassword;
  if (password) {
    hashedPassword = await argon2.hash(password);
  }

  const data = {
    id: accountId,
    hashedPassword,
    ...rest,
  };
  const result = await updateSingle(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp(result.value, res, 'Account updated successfully');
});


// DELETE /accounts/:id
router.delete('/:id', validate({ params: ParamsWithIdSchema }), auth(), async (req, res) => {
  const accountId = req.params.id;

  // Check ownership of the account
  if (req.session.account && accountId !== req.session.account.id) {
    res.status(403).json({ message: 'WrongOwnershipError' });
    return;
  }
  // Code to delete the account by ID
  const result = await deleteSingle({ id: accountId });
  if (result.isErr) {
    return handleErrorResp(res, result.error);  }
  return handleOkResp({}, res, 'Account deleted successfully');
});

export default router;
