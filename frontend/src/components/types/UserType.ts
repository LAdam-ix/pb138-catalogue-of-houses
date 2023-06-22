import { House, RatingType } from ".";
export type UserType = {
    id: string;
    name: string;
    description: string;
    email: string;
    phoneNumber: string;
    avatarUrl: string;
    role: string;
  };

export type Account = {
  id: string;
  email: string;
  name: string;
  surname: string;
  avatarPath?: string | null;
  createdAt: Date;
  updatedAt: Date; 
  deletedAt?: Date | null;
  type: string;
}

export type AccountWithData = Account & {
  averageRating: number;
} & { houses: House[], ratingsReceived: RatingType[]};