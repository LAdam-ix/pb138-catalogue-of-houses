import express from 'express';
import validate from '../middleware/validateMiddleware';
import auth from '../middleware/authMiddleware';

import { handleOkResp, handleErrorResp } from '../utils/handleResponse';
import { HousePatchSchema, HousePostSchema, HouseGetMultiSchema } from '../models/houseModels';
import { HouseRepository } from '../repositories';
import { ParamsWithIdSchema } from '../models/baseModels';
const router = express.Router();

//#region get /
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
//#endregion

// GET /:houseId
router.get('/:id', validate({ params: ParamsWithIdSchema }), async (req, res) => {
  const houseId = req.params.id;
  const result = await HouseRepository.getSingle({ id: houseId });

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp(result.value, res, 'Data retrieved successfully');
});

// POST /
router.post('/', validate({ body: HousePostSchema }), auth("DESIGNER"), async (req, res) => {

  const data = {
    designerId: req.session.account!.id,

    ...req.body,
  };
  // Create a new house record
  const result = await HouseRepository.createSingle(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp(result.value, res, 'Hosue created successfully', 201);

});

// PATCH /:houseId
router.patch('/:id', validate({ params: ParamsWithIdSchema, body: HousePatchSchema }), auth("DESIGNER"), async (req, res) => {
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

// DELETE /:houseId
router.delete('/:id', validate({ params: ParamsWithIdSchema }), auth("DESIGNER"), async (req, res) => {
  const data = { id: req.params.id, authId: req.session.account!.id, }

  const result = await HouseRepository.deleteSingle(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp({}, res, 'Data deleted successfully');
});

export default router;


