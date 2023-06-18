import prisma from './client';
import { Result } from '@badrap/result';
import { checkAccount } from './commonRepositary';
import { safeAccountSelect } from './types/helpers';
import type {
  AccountGetData,
  AccountCreateData,
  AccountUpdateData,
  AccountDeleteData,
} from './types/data';
import {
  AccountCreateResult,
  AccountDeleteResult,
  AccountGetSingleResult,
  AccountUpdateResult,
} from './types/returns';
import { DeletedRecordError, NonexistentRecordError } from './types/errors';


export const getSingle = async (data: AccountGetData): AccountGetSingleResult => {
  try {
    const account = await prisma.account.findUnique({
      where: {
        id: data.id
      },
      select: {
        ...safeAccountSelect,
        houses: true,
        ratingsReceived: true,
      },
    })
    if (account === null) {
      return Result.err(new NonexistentRecordError('The specified account does not exist!'));
    }
    if (account.deletedAt !== null) {
      return Result.err(new DeletedRecordError('The specified account has already been deleted!'));
    }
    const ratings = account.ratingsReceived;
    let averageRating = 0;

    if (ratings.length > 0) {
      const totalRating = ratings.reduce((sum, rating) => sum + rating.score, 0);
      averageRating = totalRating / ratings.length;
    }

    return Result.ok({ ...account, averageRating });
  } catch (error) {
    return Result.err(error as Error);
  }
};



export const createSingle = async (data: AccountCreateData): AccountCreateResult => {
  try {
    return Result.ok(await prisma.account.create(
      {
        data: data,
        select: safeAccountSelect,
      }));
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const updateSingle = async (data: AccountUpdateData): AccountUpdateResult => {
  try {
    return await prisma.$transaction(async (tx) => {
      const employeeCheck = await checkAccount({ id: data.id, email: data.email }, tx);

      if (employeeCheck.isErr) {
        return Result.err(employeeCheck.error);
      }
      const account = await tx.account.update(
        {
          where: { id: data.id },
          data: data,
          select: safeAccountSelect,


        },
      );
      return Result.ok(account);
    });
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const deleteSingle = async (data: AccountDeleteData): AccountDeleteResult => {
  try {
    return await prisma.$transaction(async (tx) => {
      const accountCheck = await checkAccount({ id: data.id }, tx);

      if (accountCheck.isErr) {
        return Result.err(accountCheck.error);
      }
      const account = await tx.account.update(
        {
          where: { id: data.id },
          data: { deletedAt: new Date() },
          select: safeAccountSelect,
        },
      );
      return Result.ok(account);
    });
  } catch (error) {
    return Result.err(error as Error);
  }
};



