import { OfferDocumentData } from '../../src/types/model/offer-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const offerReferenceMock: { [key: string]: DocumentReference<OfferDocumentData> } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    path: 'offers/LyCfl6Eg7JKuD7XJ6IPi'
  } as unknown as DocumentReference<OfferDocumentData>
}
