import express from 'express';
import validate from '../middleware/validateMiddleware';
import auth from '../middleware/authMiddleware';

import { RatingRepository } from '../repositories';
import { ParamsWithIdSchema } from '../models/baseModels';
import { handleErrorResp, handleOkResp } from '../utils/handleResponse';
import { RatingPatchSchema, RatingCreateSchema } from '../models';

const router = express.Router();

// GET /ratings/:ratingId
// NO AUTH
router.get('/:id', validate({ params: ParamsWithIdSchema }), async (req, res) => {
  const result = await RatingRepository.getSingle({ id: req.params.id });
  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp(result.value, res, 'Rating retrieved successfully');
});

// POST /ratings/
// AUTH Logged in
router.post('/', validate({ body: RatingCreateSchema }), auth(), async (req, res) => {
  const data = {
    ...req.body,
    customerId: req.session.account!.id,

  };
  const result = await RatingRepository.createSingle(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp(result.value, res, 'Rating created successfully');
});

// PATCH /ratings/:ratingId
// AUTH SPECIFIC USER
router.patch('/:id', validate({ params: ParamsWithIdSchema, body: RatingPatchSchema }), auth(), async (req, res) => {
  const data = {
    id: req.params.id,
    ...req.body,
    authId: req.session.account!.id,
  };
  const result = await RatingRepository.updateSingle(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp(result.value, res, 'Rating updated successfully');
});

// DELETE /ratings/:ratingId
// AUTH SPECIFIC USER
router.delete('/:id', validate({ params: ParamsWithIdSchema }), auth(), async (req, res) => {
  const data = {
    id: req.params.id,
    authId: req.session.account!.id,
  };

  const result = await RatingRepository.deleteSingle(data);
  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp({}, res, 'Rating deleted successfully');
});

export default router;
