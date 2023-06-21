import { Account, House } from ".";

export type Order = {
    id: string
    price: number
    location: string
    houseId: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    customerId: string
    designerId: string
};

export type OrderResult = Order & {
  house: House,
  designer: Account,
  customer: Account,
}
  