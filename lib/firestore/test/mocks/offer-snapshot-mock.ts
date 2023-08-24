import { OfferDocumentData } from '../../src/types/model/offer-document-data'
import { offerDocumentDataMock } from './offer-document-data-mock'
import { offerReferenceMock } from './offer-reference-mock'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export const offerSnapshotMock: { [key: string]: QueryDocumentSnapshot<OfferDocumentData> } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    ref: offerReferenceMock['LyCfl6Eg7JKuD7XJ6IPi']!,
    id: offerReferenceMock['LyCfl6Eg7JKuD7XJ6IPi']!.id,
    exists: true,
    data: () => offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']
  } as unknown as QueryDocumentSnapshot<OfferDocumentData>
}
