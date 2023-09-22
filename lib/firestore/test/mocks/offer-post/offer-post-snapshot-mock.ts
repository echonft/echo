import type { OfferPostDocumentData } from '@echo/firestore/types/model/offer-post/offer-post-document-data'
import { offerPostDocumentDataMock } from '@echo/firestore-mocks/offer-post/offer-post-document-data-mock'
import { offerPostReferenceMock } from '@echo/firestore-mocks/offer-post/offer-post-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const offerPostSnapshotMock: { [key: string]: QueryDocumentSnapshot<OfferPostDocumentData> } = {
  hot4VWDzd6ZRsC3nsvnb: {
    ref: offerPostReferenceMock['hot4VWDzd6ZRsC3nsvnb']!,
    id: offerPostReferenceMock['hot4VWDzd6ZRsC3nsvnb']!.id,
    exists: true,
    data: () => offerPostDocumentDataMock['hot4VWDzd6ZRsC3nsvnb']
  } as unknown as QueryDocumentSnapshot<OfferPostDocumentData>
}
