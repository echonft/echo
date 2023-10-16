import type { OfferPost } from '@echo/firestore/types/model/offer-post/offer-post'
import type { DocumentReference } from 'firebase-admin/lib/firestore'

export const offerPostReferenceMock: Record<string, DocumentReference<OfferPost>> = {
  hot4VWDzd6ZRsC3nsvnb: {
    id: 'hot4VWDzd6ZRsC3nsvnb',
    path: 'offer-posts/hot4VWDzd6ZRsC3nsvnb'
  } as unknown as DocumentReference<OfferPost>
}
