
// import type { Attendance, Employee } from '@prisma/client';
import type { Result } from '@badrap/result';
import { Account, House, Order, Rating } from '@prisma/client';


type AsyncResult<T> = Promise<Result<T>>;
type EmptyResult = AsyncResult<{}>;
type AnyResult = AsyncResult<any>;

export type TransactionCheckOperationResult = Promise<Result<{}>>;

type SafeAccount = {
  id: string;
  email: string;
  name: string;
  surename: string;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  type: string;
};

type SafeAccountAverageRating = SafeAccount & {
  averageRating: number;
};

type DbSafeAccount = AsyncResult<SafeAccount>;

export type AccountGetSingleResult = AnyResult;

export type AccountCreateResult = DbSafeAccount;

export type AccountUpdateResult = DbSafeAccount;

export type AccountDeleteResult = DbSafeAccount;

type DbHouse = AsyncResult<House>;
// type DbHouse = AnyResult;

export type HouseGetMultiResult = AsyncResult<House[]>;

export type HouseGetSingleResult = AsyncResult<House & { designer: SafeAccountAverageRating }>;

export type HouseCreateResult = DbHouse;

export type HouseUpdateResult = DbHouse;

export type HouseDeleteResult = DbHouse;



type OrderGet = Order & {house:House, designer:  SafeAccount, customer: SafeAccount}

export type OrderGetMultiResult = AsyncResult<OrderGet[]>;

export type OrderGetSingleResult = AsyncResult<OrderGet>;

export type OrderCreateResult = OrderGetSingleResult;

export type OrderUpdateResult = OrderGetSingleResult;

export type OrderDeleteResult = OrderGetSingleResult;


type DbRating = AsyncResult<Rating>;

export type RatingGetMultiResult = AsyncResult<Rating[]>;
// export type RatingGetSingleResult = AsyncResult<(Rating & Account)>;
export type RatingGetSingleResult = DbRating;

export type RatingCreateResult = DbRating;

export type RatingUpdateResult = DbRating;

export type RatingDeleteResult = DbRating;

