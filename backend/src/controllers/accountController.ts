import express from 'express';
import argon2 from 'argon2';
import validate from '../middleware/validateMiddleware';
import auth from '../middleware/authMiddleware';

import { AccountRepository } from '../repositories';
import { ParamsWithIdSchema } from '../models/baseModels';
import { AccountPatchSchema } from '../models';
import { handleErrorResp, handleOkResp } from '../utils/handleResponse';

const router = express.Router();

// GET Single /accounts/accountId
// NO AUTH
router.get('/:id', validate({ params: ParamsWithIdSchema }), async (req, res) => {
  const accountId = req.params.id;
  const result = await AccountRepository.getSingle({ id: accountId });
  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp(result.value, res, 'Account retrieved successfully');
});

// PATCH /accounts/accountId
// AUTH SPECIFIC USER
router.patch('/:id', validate({ params: ParamsWithIdSchema, body: AccountPatchSchema }), auth(), async (req, res) => {
  const accountId = req.params.id;
  const { password, ...rest } = req.body;
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
  const result = await AccountRepository.updateSingle(data);

  if (result.isErr) {
    handleErrorResp(res, result.error);
    return;
  }
  handleOkResp(result.value, res, 'Account updated successfully');
});

// DELETE /accounts/accountId
// AUTH SPECIFIC USER
router.delete('/:id', validate({ params: ParamsWithIdSchema }), auth(), async (req, res) => {
  const accountId = req.params.id;

  if (req.session.account && accountId !== req.session.account.id) {
    res.status(403).json({ message: 'WrongOwnershipError' });
    return;
  }
  const result = await AccountRepository.deleteSingle({ id: accountId });
  if (result.isErr) {
    handleErrorResp(res, result.error);
    return;
  }
  handleOkResp({}, res, 'Account deleted successfully');
});

export default router;
