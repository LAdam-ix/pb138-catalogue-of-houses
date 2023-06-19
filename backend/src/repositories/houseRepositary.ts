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
import { imageSaver } from '../utils/imageSaving';
import { safeAccountSelect } from './types/helpers';

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
            ...safeAccountSelect,
            ratingsReceived: {
              select: {
                score: true,
              },
            },
          },
        },
        imageLinks: true,
      },
      orderBy: {
        [orderBy]: orderDirection,
      },
    });

    const housesReturnData = houses.map((house) => {
      const designerRatings = house.designer?.ratingsReceived ?? [];
      const totalRating = designerRatings.reduce((sum, rating) => sum + rating.score, 0);
      const averageRating = designerRatings.length > 0 ? totalRating / designerRatings.length : 0;

      const designerData = {
        ...house.designer,
        averageRating: averageRating,
        ratingsReceived: undefined,
      };
      const houseData = {
        ...house,
        designer: designerData,
      }
      return houseData;
    });

    return Result.ok(housesReturnData);
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
            ...safeAccountSelect,
            ratingsReceived: true,
          },
        },
        imageLinks: true,
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
    const pictureLinks: string[] = [];
    const { images, ...restData } = data;

    // Save each picture and collect the file IDs
    return await prisma.$transaction(async (tx) => {
      for (const image of images) {
        const fileId = await imageSaver(image, tx, 'houseImages');
        pictureLinks.push(fileId);
      }

      const house = await tx.house.create({
        data: {
          ...restData,
          imageLinks: {
            connect: pictureLinks.map((id) => ({ id })),
          },
        },
        include: {
          designer: {
            select: {
              ...safeAccountSelect,
              ratingsReceived: true,
            },
          },
          imageLinks: true,
        },
      });

      return Result.ok(house);
    });
  } catch (error) {
    return Result.err(error as Error);
  }
};

export const updateSingle = async (data: HouseUpdateData): HouseUpdateResult => {
  try {
    return await prisma.$transaction(async (tx) => {
      const { authId, images, ...updateData } = data;
      const paths: string[] = [];

      const houseCheck = await checkHouse({ id: updateData.id, designerId: authId }, tx);
      if (houseCheck.isErr) {
        return Result.err(houseCheck.error);
      }


      for (const picture of images ?? []) {
        const fileId = await imageSaver(picture, tx, 'houseImages'); // Update with your desired file path
        paths.push(fileId);
      }

      const updatedHouse = await tx.house.update({
        where: {
          id: updateData.id,
        },
        data: {
          ...updateData,
          imageLinks: {
            set: paths.map((id) => ({ id })),
          },
        },
        include: {
          designer: {
            select: {
              ...safeAccountSelect,
              ratingsReceived: true,
            },
          },
          imageLinks: true,
        },
      });

      return Result.ok(updatedHouse);
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
        include: {
          designer: {
            select: {
              ...safeAccountSelect,
              ratingsReceived: true,
            },
          },
          imageLinks: true,
        },
      });

      return Result.ok(house);
    });
  } catch (error) {
    return Result.err(error as Error);
  }
};





