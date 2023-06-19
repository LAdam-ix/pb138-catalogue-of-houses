import { Result } from '@badrap/result';
import prisma from '../client';
import { checkRating } from './commonRepositary';
import {
  RatingGetMultiData,
  RatingGetSingleData,
  RatingCreateData,
  RatingDeleteData,
  RatingUpdateData,
} from './types/data';
import {
  RatingGetMultiResult,
  RatingGetSingleResult,
  RatingCreateResult,
  RatingUpdateResult,
  RatingDeleteResult,
} from './types/returns';
import { NonexistentRecordError, DeletedRecordError, DuplicateRecordError } from './types/errors';

export const getMultiple = async (data: RatingGetMultiData): RatingGetMultiResult => {
  try {
    const ratings = await prisma.rating.findMany({
      where: {
        designerId: data.designerId,
        deletedAt: null,
      },
    });

    return Result.ok(ratings);
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const getSingle = async (data: RatingGetSingleData): RatingGetSingleResult => {
  try {
    const rating = await prisma.rating.findUnique({
      where: {
        id: data.id,
      },
    });
    if (rating === null) {
      return Result.err(new NonexistentRecordError('The specified rating does not exist!'));
    }
    if (rating.deletedAt !== null) {
      return Result.err(new DeletedRecordError('The specified rating has already been deleted!'));
    }

    return Result.ok(rating);
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const createSingle = async (data: RatingCreateData): RatingCreateResult => {
  try {
    const existingRating = await prisma.rating.findFirst({
      where: {
        customerId: data.customerId,
        designerId: data.designerId,
      },
    });

    if (existingRating) {
      const error = new DuplicateRecordError('The customer already rated this designer');
      return Result.err(error);
    }

    const rating = await prisma.rating.create({
      data,
    });

    return Result.ok(rating);
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const updateSingle = async (data: RatingUpdateData): RatingUpdateResult => {
  try {
    return await prisma.$transaction(async (tx) => {
      const { authId, ...updateData } = data;
      const orderCheck = await checkRating({ id: data.id, customerId: authId }, tx);
      if (orderCheck.isErr) {
        return Result.err(orderCheck.error);
      }

      const rating = await tx.rating.update({
        where: {
          id: data.id,
        },
        data: updateData,
      });

      return Result.ok(rating);
    });
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const deleteSingle = async (data: RatingDeleteData): RatingDeleteResult => {
  try {
    return await prisma.$transaction(async (tx) => {
      const orderCheck = await checkRating({ id: data.id, customerId: data.authId }, tx);
      if (orderCheck.isErr) {
        return Result.err(orderCheck.error);
      }

      const rating = await tx.rating.update({
        where: {
          id: data.id,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return Result.ok(rating);
    });
  } catch (error) {
    return Result.err(error as Error);
  }
};
