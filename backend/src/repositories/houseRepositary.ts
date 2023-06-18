import { Result } from '@badrap/result';
import prisma from './client';
import { checkHouse } from './commonRepositary';
import {
  HouseGetMultiData,
  HouseCreateData,
  HouseDeleteData,
  HouseUpdateData,
  HouseGetSingleData
} from './types/data';
import {
  HouseGetMultiResult,
  HouseGetSingleResult,
  HouseCreateResult,
  HouseDeleteResult,
  HouseUpdateResult
} from './types/returns';
import { DeletedRecordError, NonexistentRecordError } from './types/errors';

export const getMulti = async (input: HouseGetMultiData): HouseGetMultiResult => {
  try {
    const { type, orderBy = 'createdAt', orderDirection = 'desc', priceFilter } = input;
    const { minPrice, maxPrice } = priceFilter || {};

    const houses = await prisma.house.findMany({
      where: {
        ...(type ? { type } : {}),
        ...(minPrice || maxPrice
          ? {
            cost: {
              ...(minPrice ? { gte: minPrice } : {}),
              ...(maxPrice ? { lte: maxPrice } : {}),
            },
          }
          : {}),
        deletedAt: null,
      },
      include: {
        designer: {
          select: {
            id: true,
            email: true,
            name: true,
            surename: true,
            avatar: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            type: true,
            ratingsReceived: {
              select: {
                score: true,
              },
            },
          },
        },
      },
      orderBy: {
        [orderBy]: orderDirection,
      },
    });

    houses.forEach((house) => {
      const designerRatings = house.designer?.ratingsReceived ?? [];
      const totalRating = designerRatings.reduce((sum, rating) => sum + rating.score, 0);
      const averageRating = designerRatings.length > 0 ? totalRating / designerRatings.length : 0;
      const new_designer = {
        ...house.designer,
        averageRating: averageRating,
      };
      house.designer = new_designer;
    });

    return Result.ok(houses);
  } catch (error) {
    return Result.err(error as Error);
  }
};

//return rating check for null
export const getSingle = async (data: HouseGetSingleData): HouseGetSingleResult => {
  try {
    const house = await prisma.house.findUnique({
      where: { id: data.id },
      include: {
        designer: {
          select: {
            id: true,
            email: true,
            name: true,
            surename: true,
            avatar: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            type: true,
            ratingsReceived: true,
          },
        },
      },
    });

    if (house == null) {
      return Result.err(new NonexistentRecordError('The specified account does not exist!'));
    }

    if (house.deletedAt != null) {
      return Result.err(new DeletedRecordError('The specified account has already been deleted!'));
    }

    const { ratingsReceived, ...rest } = house.designer;

    let averageRating = 0;

    if (ratingsReceived.length > 0) {
      const totalRating = ratingsReceived.reduce((sum, rating) => sum + rating.score, 0);
      averageRating = totalRating / ratingsReceived.length;
    }

    const designerWithAverageRating = {
      ...rest,
      averageRating: averageRating,
    };
    const { designer, ...restHouse } = house;
    const c = {
      ...restHouse,
      designer: designerWithAverageRating,
    };
    return Result.ok({
      ...restHouse,
      designer: designerWithAverageRating,
    });
  } catch (error) {
    return Result.err(error as Error);
  }
};


export const createSingle = async (data: HouseCreateData): HouseCreateResult => {
  try {

    const house = await prisma.house.create({
      data: data,
    });

    return Result.ok(house);
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const updateSingle = async (data: HouseUpdateData): HouseUpdateResult => {
  try {
    const { authId, ...updateData } = data;
    return await prisma.$transaction(async (tx) => {
      const { authId, ...updateData } = data;
      const houseCheck = await checkHouse({ id: updateData.id, designerId: authId }, tx);
      if (houseCheck.isErr) {
        return Result.err(houseCheck.error);
      }

      const house = await prisma.house.update({
        where: {
          id: updateData.id,
        },
        data: updateData,
      });

      return Result.ok(house);
    });
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const deleteSingle = async (data: HouseDeleteData): HouseDeleteResult => {
  try {
    const { authId, id } = data;

    return await prisma.$transaction(async (tx) => {
      const houseCheck = await checkHouse({ id: data.id, designerId: authId }, tx);
      if (houseCheck.isErr) {
        return Result.err(houseCheck.error);
      }

      const house = await tx.house.update({
        where: {
          id: id,
        },
        data: { deletedAt: new Date() },
      });

      return Result.ok(house);
    });
  } catch (error) {
    return Result.err(error as Error);
  }
};





