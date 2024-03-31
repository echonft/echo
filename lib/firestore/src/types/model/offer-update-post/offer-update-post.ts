import type { WithId } from '@echo/model/types/with-id'

export interface OfferUpdatePost extends WithId {
  offerUpdateId: string
  postedAt: number
}
