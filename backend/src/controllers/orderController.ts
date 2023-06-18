import express from 'express';
import validate from '../middleware/validateMiddleware';
import auth from '../middleware/authMiddleware';

import { handleErrorResp, handleOkResp } from '../utils';
import { OrderRepository } from '../repositories';
import { ModelIdSchema, QueryWithIdSchema } from '../models/baseModels';
import { OrderPatchSchema, OrderPostSchema } from '../models';

const router = express.Router();

router.get('/send', validate({}), auth(), async (req, res) => {
    const result = await OrderRepository.getMultiple({ customerId: req.session.account!.id });
    if (result.isErr) {
        return handleErrorResp(res, result.error);
    }

    return handleOkResp(result.value, res, 'Orders retrieved successfully');
});

router.get('/recived', validate({}), auth('DESIGNER'), async (req, res) => {
    const result = await OrderRepository.getMultiple({ designerId: req.session.account!.id });
    if (result.isErr) {
        return handleErrorResp(res, result.error);
    }
    return handleOkResp(result.value, res, 'Orders retrieved successfully');
});

router.get('/:id', validate({ params: ModelIdSchema }), auth(), async (req, res) => {
    const data = {
        authId: req.session.account!.id,
        id: req.params.id,
    }
    const result = await OrderRepository.getSingle(data);

    if (result.isErr) {
        return handleErrorResp(res, result.error);
    }

    return handleOkResp(result.value, res, 'Order retrieved successfully');
});

router.post('/', validate({ body: OrderPostSchema }), auth(), async (req, res) => {
    const data = {
        customerId: req.session.account!.id,
        ...req.body
    };

    const result = await OrderRepository.createSingle(data);

    if (result.isErr) {
        return handleErrorResp(res, result.error);
    }

    return handleOkResp(result.value, res, 'Order created successfully');
});

router.patch('/:id', validate({ params: ModelIdSchema, body: OrderPatchSchema }), auth(), async (req, res) => {

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

router.delete('/:id', validate({ params: ModelIdSchema }), auth(), async (req, res) => {
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
