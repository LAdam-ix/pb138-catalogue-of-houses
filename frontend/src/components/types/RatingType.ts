export type RatingType = {
  id: string
  score: number
  comment: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  customerId: string
  designerId: string
}
  