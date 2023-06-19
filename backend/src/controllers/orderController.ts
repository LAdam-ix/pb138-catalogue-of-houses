import express from 'express';
import validate from '../middleware/validateMiddleware';
import auth from '../middleware/authMiddleware';

import { OrderRepository } from '../repositories';
import { ParamsWithIdSchema } from '../models/baseModels';
import { handleErrorResp, handleOkResp } from '../utils';
import { OrderPatchSchema, OrderPostSchema } from '../models';

const router = express.Router();

// GET Multi(I rated) /orders/sent
// AUTH Logged in
router.get('/sent', validate({}), auth(), async (req, res) => {
  const result = await OrderRepository.getMultiple({ customerId: req.session.account!.id });
  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }

  return handleOkResp(result.value, res, 'Orders retrieved successfully');
});

// GET Multi(I got rated) /orders/send
// AUTH DESIGNER
router.get('/recived', validate({}), auth('DESIGNER'), async (req, res) => {
  const result = await OrderRepository.getMultiple({ designerId: req.session.account!.id });
  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }
  return handleOkResp(result.value, res, 'Orders retrieved successfully');
});

// GET Single /orders/orderId
// AUTH SPECIFIC ACCOUNT
router.get('/:id', validate({ params: ParamsWithIdSchema }), auth(), async (req, res) => {
  const data = {
    authId: req.session.account!.id,
    id: req.params.id,
  };
  const result = await OrderRepository.getSingle(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }

  return handleOkResp(result.value, res, 'Order retrieved successfully');
});

// POST /orders/orderId
// AUTH Logged in
router.post('/', validate({ body: OrderPostSchema }), auth(), async (req, res) => {
  const data = {
    customerId: req.session.account!.id,
    ...req.body,
  };

  const result = await OrderRepository.createSingle(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }

  return handleOkResp(result.value, res, 'Order created successfully');
});

// PATCH /orders/orderId
// AUTH SPECIFIC USER
router.patch('/:id', validate({ params: ParamsWithIdSchema, body: OrderPatchSchema }), auth(), async (req, res) => {
  const data = {
    authId: req.session.account!.id,
    id: req.params.id,
    ...req.body,
  };

  const result = await OrderRepository.updateSingle(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }

  return handleOkResp(result.value, res, 'Order updated successfully');
});

// DELETE /orders/send
// AUTH SPECIFIC USER
router.delete('/:id', validate({ params: ParamsWithIdSchema }), auth(), async (req, res) => {
  const data = {
    authId: req.session.account!.id,
    id: req.params.id,
  };

  const result = await OrderRepository.deleteSingle(data);

  if (result.isErr) {
    return handleErrorResp(res, result.error);
  }

  return handleOkResp(result.value, res, 'Order deleted successfully');
});

export default router;
