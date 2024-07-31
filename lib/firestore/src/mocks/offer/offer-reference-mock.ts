import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference/collection-reference-name'
import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { DocumentReference } from 'firebase-admin/firestore'

export function offerReferenceMock(): Record<string, DocumentReference<OfferDocumentData>> {
  const id = offerMockToJohnnycageId()
  return {
    LyCfl6Eg7JKuD7XJ6IPi: {
      id,
      path: `${CollectionReferenceName.OFFERS}/${id}`
    } as unknown as DocumentReference<OfferDocumentData>
  }
}
