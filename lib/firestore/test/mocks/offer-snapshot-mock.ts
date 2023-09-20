import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { offerDocumentDataMock } from '@echo/firestore-mocks/offer-document-data-mock'
import { offerReferenceMock } from '@echo/firestore-mocks/offer-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const offerSnapshotMock: { [key: string]: QueryDocumentSnapshot<OfferDocumentData> } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    ref: offerReferenceMock['LyCfl6Eg7JKuD7XJ6IPi']!,
    id: offerReferenceMock['LyCfl6Eg7JKuD7XJ6IPi']!.id,
    exists: true,
    data: () => offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']
  } as unknown as QueryDocumentSnapshot<OfferDocumentData>
}
