import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const offerReferenceMock: Record<string, DocumentReference<OfferDocumentData>> = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    path: 'offers/LyCfl6Eg7JKuD7XJ6IPi'
  } as unknown as DocumentReference<OfferDocumentData>
}
