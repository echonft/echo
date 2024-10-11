import { offerDocumentDataMock } from '@echo/firestore/mocks/offer/offer-document-data-mock'
import { offerReferenceMock } from '@echo/firestore/mocks/offer/offer-reference-mock'
import { type OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Offer } from '@echo/model/types/offer'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export function offerSnapshotMock(): Record<string, QueryDocumentSnapshot<Offer, OfferDocumentData>> {
  return {
    LyCfl6Eg7JKuD7XJ6IPi: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref: offerReferenceMock()[offerMockToJohnnycageId()]!,
      id: offerReferenceMock()[offerMockToJohnnycageId()]?.id,
      exists: true,
      data: () => offerDocumentDataMock()[offerMockToJohnnycageId()]
    } as unknown as QueryDocumentSnapshot<Offer, OfferDocumentData>
  }
}
