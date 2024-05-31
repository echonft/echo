import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { offerDocumentDataMock } from '@echo/firestore-mocks/offer/offer-document-data-mock'
import { offerReferenceMock } from '@echo/firestore-mocks/offer/offer-reference-mock'
import { offerMockToJohnnycageId } from '@echo/model-mocks/offer/offer-mock'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export function offerSnapshotMock(): Record<string, QueryDocumentSnapshot<OfferDocumentData>> {
  return {
    LyCfl6Eg7JKuD7XJ6IPi: {
      ref: offerReferenceMock()[offerMockToJohnnycageId()]!,
      id: offerReferenceMock()[offerMockToJohnnycageId()]!.id,
      exists: true,
      data: () => offerDocumentDataMock()[offerMockToJohnnycageId()]
    } as unknown as QueryDocumentSnapshot<OfferDocumentData>
  }
}
