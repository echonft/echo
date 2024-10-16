import { CollectionReferenceName } from '@echo/firestore/constants/collection-reference-name'
import { type OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Offer } from '@echo/model/types/offer/offer'
import { DocumentReference } from 'firebase-admin/firestore'

export function offerReferenceMock(): Record<string, DocumentReference<Offer, OfferDocumentData>> {
  const id = offerMockToJohnnycageId()
  return {
    LyCfl6Eg7JKuD7XJ6IPi: {
      id,
      path: `${CollectionReferenceName.Offers}/${id}`
    } as unknown as DocumentReference<Offer, OfferDocumentData>
  }
}
