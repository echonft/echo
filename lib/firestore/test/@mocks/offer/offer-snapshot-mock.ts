import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { offerDocumentDataMock } from '@echo/firestore-mocks/offer/offer-document-data-mock'
import { offerReferenceMock } from '@echo/firestore-mocks/offer/offer-reference-mock'
import { OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export const offerSnapshotMock: Record<string, QueryDocumentSnapshot<OfferDocumentData>> = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    ref: offerReferenceMock[OFFER_MOCK_TO_JOHNNYCAGE_ID]!,
    id: offerReferenceMock[OFFER_MOCK_TO_JOHNNYCAGE_ID]!.id,
    exists: true,
    data: () => offerDocumentDataMock[OFFER_MOCK_TO_JOHNNYCAGE_ID]
  } as unknown as QueryDocumentSnapshot<OfferDocumentData>
}
