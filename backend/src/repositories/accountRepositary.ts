import { Result } from '@badrap/result';
import prisma from '../client';
import { checkAccount } from './commonRepositary';
import safeAccountSelect from './types/helpers';
import type {
  AccountGetMultiData,
  AccountGetCountData,
  AccountGetSingleData,
  AccountCreateData,
  AccountUpdateData,
  AccountDeleteData,
} from './types/data';
import {
  AccountGetMultiResult,
  AccountGetCountResult,
  AccountCreateResult,
  AccountDeleteResult,
  AccountGetSingleResult,
  AccountUpdateResult,
} from './types/returns';
import { DeletedRecordError, DuplicateRecordError, NonexistentRecordError } from './types/errors';
import imageSaver from '../utils/imageSaving';

export const getMulti = async (data: AccountGetMultiData): AccountGetMultiResult => {
  try {
    const accounts = await prisma.account.findMany({
      where: {
        ...(data.type ? { type: data.type } : {}),
        deletedAt: null,
      },
      select: {
        ...safeAccountSelect,
        ratingsReceived: {
          where: { deletedAt: null }
        },
      },
      orderBy: {
        name: data.orderDirection?? 'asc',
      },
    });

    const accountResults = [];
    for (const account of accounts) {
      const ratings = account.ratingsReceived;
      let averageRating = 0;

      if (ratings.length > 0) {
        const totalRating = ratings.reduce((sum, rating) => sum + rating.score, 0);
        averageRating = totalRating / ratings.length;
      }

      const { ratingsReceived, ...accountData } = account;
      const accountResult = { ...accountData, averageRating };
      accountResults.push(accountResult);
    }

    return Result.ok(accountResults);
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const getCount = async (data: AccountGetCountData): AccountGetCountResult => {
  try {
    const count = await prisma.account.count({
      where: {
        ...(data.type ? { type: data.type } : {}),
      },
    });

    return Result.ok(count);
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const getSingle = async (data: AccountGetSingleData): AccountGetSingleResult => {
  try {
    const account = await prisma.account.findUnique({
      where: {
        id: data.id,
      },
      select: {
        ...safeAccountSelect,
        houses: true,
        ratingsReceived: {
          where: { deletedAt: null }
        },
      },
    });
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
    const existingAccount = await prisma.account.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingAccount) {
      return Result.err(new DuplicateRecordError('Email already in use'));
    }

    return Result.ok(await prisma.account.create(
      {
        data,
        select: safeAccountSelect,
      },
    ));
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const updateSingle = async (data: AccountUpdateData): AccountUpdateResult => {
  try {
    return await prisma.$transaction(async (tx) => {
      const result = await checkAccount({ id: data.id, email: data.email }, tx);

      if (result.isErr) {
        return Result.err(result.error);
      }
      const { avatar, ...updateData } = data;
      let avatarId;
      if (avatar) {
        const result = await imageSaver(avatar, tx, 'accountImages');
        if (result.isErr){
          return Result.err(result.error);
        }
        avatarId = result.value as string;
        
      }

      const account = await tx.account.update(
        {
          where: { id: data.id },
          data: {
            ...updateData,
            ...(avatarId ? { avatarId: avatarId } : {}),
          },
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
