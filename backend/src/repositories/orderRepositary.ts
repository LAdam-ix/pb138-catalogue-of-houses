import { Result } from '@badrap/result';
import prisma from '../client';
import { checkOrder } from './commonRepositary';
import {
  OrderGetMultiData,
  OrderGetSingleData,
  OrderCreateData,
  OrderDeleteData,
  OrderUpdateData,
} from './types/data';
import {
  OrderGetMultiResult,
  OrderGetSingleResult,
  OrderCreateResult,
  OrderUpdateResult,
  OrderDeleteResult,
} from './types/returns';
import { NonexistentRecordError, WrongOwnershipError } from './types/errors';
import safeAccountSelect from './types/helpers';

export const getMultiple = async (data: OrderGetMultiData): OrderGetMultiResult => {
  try {
    const { designerId, customerId } = data;
    const orders = await prisma.order.findMany({
      where:
      {
        deletedAt: null,
        ...(customerId && { customerId }),
        ...(designerId && { designerId }),
      },
      include: {
        house: true,
        designer: { select: safeAccountSelect },
        customer: { select: safeAccountSelect },
      },
    });

    return Result.ok(orders);
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const getSingle = async (data: OrderGetSingleData): OrderGetSingleResult => {
  try {
    const order = await prisma.order.findUniqueOrThrow({
      where: {
        id: data.id,
      },
      include: {
        house: true,
        designer: { select: safeAccountSelect },
        customer: { select: safeAccountSelect },
      },
    });
    if (order.customerId !== data.authId || order.designerId !== data.authId) {
      return Result.err(new WrongOwnershipError());
    }
    return Result.ok(order);
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const createSingle = async (data: OrderCreateData): OrderCreateResult => {
  try {
    const house = await prisma.house.findFirst({
      where: { id: data.houseId, designerId: data.designerId },
    });

    if (!house) {
      return Result.err(new NonexistentRecordError('The specified house or designer does not exist!'));
    }

    const order = await prisma.order.create({
      data,
      include: {
        house: true,
        designer: { select: safeAccountSelect },
        customer: { select: safeAccountSelect },
      },
    });

    return Result.ok(order);
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const updateSingle = async (data: OrderUpdateData): OrderUpdateResult => {
  try {
    return await prisma.$transaction(async (tx) => {
      const { authId, ...updateData } = data;

      const orderCheck = await checkOrder({ id: data.id, customerId: authId }, tx);
      if (orderCheck.isErr) {
        return Result.err(orderCheck.error);
      }

      const order = await tx.order.update({
        where: {
          id: data.id,

        },
        data: updateData,
        include: {
          house: true,
          designer: { select: safeAccountSelect },
          customer: { select: safeAccountSelect },
        },
      });

      return Result.ok(order);
    });
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const deleteSingle = async (data: OrderDeleteData): OrderDeleteResult => {
  try {
    return await prisma.$transaction(async (tx) => {
      const orderCheck = await checkOrder({ id: data.id, customerId: data.authId }, tx);
      if (orderCheck.isErr) {
        return Result.err(orderCheck.error);
      }

      const order = await tx.order.update({
        where: {
          id: data.id,
        },
        data: {
          deletedAt: new Date(),

        },
        include: {
          house: true,
          designer: { select: safeAccountSelect },
          customer: { select: safeAccountSelect },
        },
      });

      return Result.ok(order);
    });
  } catch (error) {
    return Result.err(error as Error);
  }
};
