
// import type { Attendance, Employee } from '@prisma/client';
import type { Result } from '@badrap/result';
import { Account, House, ImageLink, Order, Rating } from '@prisma/client';


type AsyncResult<T> = Promise<Result<T>>;
// type EmptyResult = AsyncResult<{}>;
// type AnyResult = AsyncResult<any>;

export type TransactionCheckOperationResult = Promise<Result<{}>>;

type SafeAccount = {
  id: string;
  email: string;
  name: string;
  surename: string;
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

export type AccountGetSingleResult =
  AsyncResult<SafeAccountAverageRating &
  { houses: House[], ratingsReceived: Rating[] }>;

export type AccountCreateResult = DbSafeAccount;

export type AccountUpdateResult = DbSafeAccount;

export type AccountDeleteResult = DbSafeAccount;


type DbHouse = AsyncResult<House & { designer: SafeAccount, imageLinks: ImageLink[]}>;


export type HouseGetMultiResult = AsyncResult<(House & { designer: SafeAccountAverageRating , imageLinks: ImageLink[] })[]>;

export type HouseGetSingleResult = AsyncResult<House & { designer: SafeAccountAverageRating, imageLinks: ImageLink[]}>;

export type HouseCreateResult = DbHouse;

export type HouseUpdateResult = DbHouse;

export type HouseDeleteResult = DbHouse;


type OrderGet = Order & { house: House, designer: SafeAccount, customer: SafeAccount }

export type OrderGetMultiResult = AsyncResult<OrderGet[]>;

export type OrderGetSingleResult = AsyncResult<OrderGet>;

export type OrderCreateResult = OrderGetSingleResult;

export type OrderUpdateResult = OrderGetSingleResult;

export type OrderDeleteResult = OrderGetSingleResult;


type DbRating = AsyncResult<Rating>;

export type RatingGetMultiResult = AsyncResult<Rating[]>;

export type RatingGetSingleResult = DbRating;

export type RatingCreateResult = DbRating;

export type RatingUpdateResult = DbRating;

export type RatingDeleteResult = DbRating;

