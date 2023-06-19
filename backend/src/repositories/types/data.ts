import type { Prisma, PrismaClient } from '@prisma/client';
import { AccountType, HouseOrdering, HouseType } from '../../enumTypes';

// COMMON
type Id = { id: string, };
type AuthId = {
  id: string;
  authId: string;
};
type CheckAuthId = {
  id: string;
  designerId?: string;
  customerId?: string;
};
export type CheckAccountData = Id & { email?: string };

export type CheckHouseData = CheckAuthId;

export type CheckOrderData = CheckAuthId;

export type CheckRatingData = CheckAuthId;

export type PrismaTransactionHandle = Omit<PrismaClient<
Prisma.PrismaClientOptions, never,
Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
'$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

// ACCOUNT
export type AccountGetData = Id;

export type AccountCreateData = {
  email: string;
  name: string;
  surename: string;
  hashedPassword: string;
  type: AccountType
};

export type AccountUpdateData = {
  id: string;
  email?: string;
  name?: string;
  surename?: string;
  hashedPassword?: string;
  type?: AccountType,
  avatar?: string,
};

export type AccountDeleteData = Id;

type PriceFilter = {
  minPrice?: number | null;
  maxPrice?: number | null;
};

export type HouseGetMultiData = {
  type?: HouseType;
  orderBy?: typeof HouseOrdering[number];
  orderDirection?: 'asc' | 'desc';
  priceFilter?: PriceFilter;
};

// HOUSE
export type HouseGetSingleData = Id;

export type HouseCreateData = {
  name: string
  designerId: string
  type: string;
  images: string[];
  cost: number;
  description: string;
};

export type HouseUpdateData = {
  authId: string
  id: string;
  type?: string;
  images?: string[];
  cost?: number;
  name?: string
  description?: string;

};

export type HouseDeleteData = AuthId;

// ORDER
export type OrderGetMultiData = {
  designerId?: string;
  customerId?: string;
};

export type OrderGetSingleData = AuthId;

export type OrderCreateData = {
  location: string;
  customerId: string;
  designerId: string;
  houseId: string;
  price: number;
};

export type OrderUpdateData = {
  authId: string
  id: string;
  location: string;
};

export type OrderDeleteData = AuthId;

// RATING
export type RatingGetMultiData = {
  designerId: string;
};

export type RatingGetSingleData = Id;

export type RatingCreateData = {
  score: number
  comment?: string | null;
  customerId: string
  designerId: string
};

export type RatingUpdateData = {
  authId: string
  id: string;
  score?: number
  comment?: string | null;
};

export type RatingDeleteData = AuthId;
