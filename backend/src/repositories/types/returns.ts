import type { Result } from '@badrap/result';
import {
  House,
  ImageLink,
  Order,
  Rating,
} from '@prisma/client';

// COMMON
type AsyncResult<T> = Promise<Result<T>>;

export type TransactionCheckOperationResult = Promise<Result<{}>>;

// ACCOUNT
type SafeAccount = {
  id: string;
  email: string;
  name: string;
  surname: string;
  avatarPath?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  type: string;
};

type SafeAccountAverageRating = SafeAccount & {
  averageRating: number;
};

type DbSafeAccount = AsyncResult<SafeAccount>;

export type AccountGetMultiResult =
  AsyncResult<SafeAccountAverageRating[]>;

export type AccountGetCountResult = AsyncResult<number>

export type AccountGetSingleResult =
  AsyncResult<SafeAccountAverageRating &
  { houses: House[], ratingsReceived: Rating[] }>;

export type AccountCreateResult = DbSafeAccount;

export type AccountUpdateResult = DbSafeAccount;

export type AccountDeleteResult = DbSafeAccount;

type DbHouse = AsyncResult<House & { designer: SafeAccount, imageLinks: ImageLink[] }>;

// HOUSE
export type HouseGetMultiResult = AsyncResult<(House & {
  designer: SafeAccountAverageRating, imageLinks: ImageLink[]
})[]>;

export type HouseGetSingleResult = AsyncResult<House & {
  designer: SafeAccountAverageRating, imageLinks: ImageLink[]
}>;

export type HouseCreateResult = DbHouse;

export type HouseUpdateResult = DbHouse;

export type HouseDeleteResult = DbHouse;

// ORDER
type OrderGet = Order & { house: House, designer: SafeAccount, customer: SafeAccount };

export type OrderGetMultiResult = AsyncResult<OrderGet[]>;

export type OrderGetSingleResult = AsyncResult<OrderGet>;

export type OrderCreateResult = OrderGetSingleResult;

export type OrderUpdateResult = OrderGetSingleResult;

export type OrderDeleteResult = OrderGetSingleResult;

// RATING
type DbRating = AsyncResult<Rating>;

export type RatingGetMultiResult = AsyncResult<Rating[]>;

export type RatingGetSingleResult = DbRating;

export type RatingCreateResult = DbRating;

export type RatingUpdateResult = DbRating;

export type RatingDeleteResult = DbRating;
