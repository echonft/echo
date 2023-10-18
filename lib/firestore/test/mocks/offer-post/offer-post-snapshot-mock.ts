import { type OfferPost } from '@echo/firestore/types/model/offer-post/offer-post'
import { offerPostMock } from '@echo/firestore-mocks/offer-post/offer-post-mock'
import { offerPostReferenceMock } from '@echo/firestore-mocks/offer-post/offer-post-reference-mock'
import { type QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const offerPostSnapshotMock: Record<string, QueryDocumentSnapshot<OfferPost>> = {
  hot4VWDzd6ZRsC3nsvnb: {
    ref: offerPostReferenceMock.hot4VWDzd6ZRsC3nsvnb!,
    id: offerPostReferenceMock.hot4VWDzd6ZRsC3nsvnb!.id,
    exists: true,
    data: () => offerPostMock.hot4VWDzd6ZRsC3nsvnb
  } as unknown as QueryDocumentSnapshot<OfferPost>
}
