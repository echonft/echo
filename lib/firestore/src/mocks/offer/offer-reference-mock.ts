import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { DocumentReference } from 'firebase-admin/firestore'

export function offerReferenceMock(): Record<string, DocumentReference<OfferDocumentData>> {
  return {
    LyCfl6Eg7JKuD7XJ6IPi: {
      id: offerMockToJohnnycageId(),
      path: `offers/${offerMockToJohnnycageId()}`
    } as unknown as DocumentReference<OfferDocumentData>
  }
}
