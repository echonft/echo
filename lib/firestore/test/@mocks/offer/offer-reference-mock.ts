import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
import { DocumentReference } from 'firebase-admin/firestore'

export const offerReferenceMock: Record<string, DocumentReference<OfferDocumentData>> = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    id: OFFER_MOCK_TO_JOHNNYCAGE_ID,
    path: `offers/${OFFER_MOCK_TO_JOHNNYCAGE_ID}`
  } as unknown as DocumentReference<OfferDocumentData>
}
