import { Account } from ".";
import { ImageLink } from "./MiscTypes";

export type DesignType = {
  id: string;
  name: string;
  description: string;
  designerId: string;
  category: string;
  pictureURL: string;
  price: number;
};

export type House = {
  id: string
  type: string
  name: string
  price: number
  description: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  designerId: string
}

export type HouseResult = House & Account & ImageLink;
