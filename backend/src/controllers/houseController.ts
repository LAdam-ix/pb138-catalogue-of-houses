import express from 'express';
import validate from '../middleware/validateMiddleware';
import auth from '../middleware/authMiddleware';

import { HouseRepository } from '../repositories';
import { ParamsWithIdSchema } from '../models/baseModels';
import { handleOkResp, handleErrorResp } from '../utils/handleResponse';
import { HousePatchSchema, HousePostSchema, HouseGetMultiSchema } from '../models/houseModels';

const router = express.Router();

// GET Multi /houses/
// NO AUTH
router.get('/', validate({ query: HouseGetMultiSchema }), async (req, res) => {
  const data = {
    type: req.query.type,
    orderBy: req.query.orderBy || 'createdAt',
    orderDirection: req.query.orderDirection || 'desc',
    priceFilter: {
      minPrice: Number(req.query.minPrice),
      maxPrice: Number(req.query.maxPrice),
    },
  };
  const result = await HouseRepository.getMulti(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp(result.value, res, 'Houses retrieved successfully');
});

// GET Single /houses/houseId
// NO AUTH
router.get('/:id', validate({ params: ParamsWithIdSchema }), async (req, res) => {
  const houseId = req.params.id;
  const result = await HouseRepository.getSingle({ id: houseId });

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp(result.value, res, 'Data retrieved successfully');
});

// POST /houses/
// AUTH DESIGNER
router.post('/', validate({ body: HousePostSchema }), auth('DESIGNER'), async (req, res) => {
  const data = {
    designerId: req.session.account!.id,

    ...req.body,
  };
  const result = await HouseRepository.createSingle(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp(result.value, res, 'Hosue created successfully', 201);
});

// PATCH /houses/houseId
// AUTH SPECIFIC DESIGNER
router.patch('/:id', validate({ params: ParamsWithIdSchema, body: HousePatchSchema }), auth('DESIGNER'), async (req, res) => {
  const houseId = req.params.id;
  const data = {
    authId: req.session.account!.id,
    id: houseId,
    ...req.body,
  };
  const result = await HouseRepository.updateSingle(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp({}, res, 'Data updated successfully');
});

// DELETE /houses/houseId
// AUTH SPECIFIC DESIGNER
router.delete('/:id', validate({ params: ParamsWithIdSchema }), auth('DESIGNER'), async (req, res) => {
  const data = { id: req.params.id, authId: req.session.account!.id };

  const result = await HouseRepository.deleteSingle(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp({}, res, 'Data deleted successfully');
});

export default router;
