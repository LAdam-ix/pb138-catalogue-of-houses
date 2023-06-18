import { Result } from '@badrap/result';
import type {
  CheckAccountData,
  CheckHouseData,
  CheckOrderData,
  CheckRatingData,
  PrismaTransactionHandle,
} from './types/data';
import {
  DeletedRecordError,
  NonexistentRecordError,
  WrongOwnershipError,
} from './types/errors';
import type { TransactionCheckOperationResult } from './types/returns';

export const checkAccount = async (
  data: CheckAccountData,
  tx: PrismaTransactionHandle,
): TransactionCheckOperationResult => {
  const account = await tx.account.findUnique({
    where: { id: data.id },
  });
  if (account == null) {
    return Result.err(new NonexistentRecordError('The specified account does not exist!'));
  }
  if (account.deletedAt != null) {
    return Result.err(new DeletedRecordError('The specified account has already been deleted!'));
  }
  if (data.email) {
    const account = await tx.account.findUnique({
      where: { email: data.email },
    });
    if (account != null) {
      return Result.err(new Error('The specified email is allready registered!'));
    }
  }

  return Result.ok({});
};

export const checkHouse = async (
  data: CheckHouseData,
  tx: PrismaTransactionHandle,): TransactionCheckOperationResult => {
  const house = await tx.house.findUnique({
    where: {
      id: data.id,
    },
  });

  if (house == null) {
    return Result.err(new NonexistentRecordError('The specified account does not exist!'));
  }
  if (data.designerId && house.designerId !== data.designerId) {
    return Result.err(new WrongOwnershipError('Forbiden: You have no access to this data'));
  }

  if (house.deletedAt != null) {
    return Result.err(new DeletedRecordError('The specified account has already been deleted!'));
  }
  return Result.ok({});
};

export const checkOrder = async (
  data: CheckOrderData,
  tx: PrismaTransactionHandle,
): TransactionCheckOperationResult => {
  const order = await tx.order.findUnique({
    where: { id: data.id },
  });
  if (order == null) {
    return Result.err(new NonexistentRecordError('The specified order does not exist!'));
  }
  if (order.designerId !== order.designerId) {
    return Result.err(new WrongOwnershipError('Forbiden: You have no access to this data'));
  }
  if (data.customerId && order.customerId !== data.customerId) {
    return Result.err(new WrongOwnershipError('Forbiden: You have no access to this data'));
  }
  if (order.deletedAt != null) {
    return Result.err(new DeletedRecordError('The specified order has already been deleted!'));
  }
  return Result.ok({});
};

export const checkRating = async (
  data: CheckRatingData,
  tx: PrismaTransactionHandle,
): TransactionCheckOperationResult => {
  const rating = await tx.rating.findUnique({
    where: {
      id: data.id,
    },
  });
  if (rating == null) {
    return Result.err(new NonexistentRecordError('The specified rating does not exist!'));
  }
  if (data.customerId && rating.customerId !== data.customerId) {
    return Result.err(new WrongOwnershipError('Forbiden: You have no access to this data'));
  }
  if (rating.deletedAt != null) {
    return Result.err(new DeletedRecordError('The specified rating has already been deleted!'));
  }
  return Result.ok({});
};