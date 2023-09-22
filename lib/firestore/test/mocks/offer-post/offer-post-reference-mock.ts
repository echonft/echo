import type { OfferPostDocumentData } from '@echo/firestore/types/model/offer-post/offer-post-document-data'
import type { DocumentReference } from 'firebase-admin/lib/firestore'

export const offerPostReferenceMock: { [key: string]: DocumentReference<OfferPostDocumentData> } = {
  hot4VWDzd6ZRsC3nsvnb: {
    id: 'hot4VWDzd6ZRsC3nsvnb',
    path: 'offer-posts/hot4VWDzd6ZRsC3nsvnb'
  } as unknown as DocumentReference<OfferPostDocumentData>
}
