import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import type { DocumentReference } from 'firebase-admin/lib/firestore'

export const offerReferenceMock: { [key: string]: DocumentReference<OfferDocumentData> } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    path: 'offers/LyCfl6Eg7JKuD7XJ6IPi'
  } as unknown as DocumentReference<OfferDocumentData>
}
