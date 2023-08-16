import { FirestoreSnapshot } from '../../src/types/abstract/firestore-snapshot'
import { OfferDocumentData } from '../../src/types/model/document-data/offer-document-data'
import { offerDocumentDataMock } from './offer-document-data-mock'
import { offerReferenceMock } from './offer-reference-mock'

export const offerSnapshotMock: { [key: string]: FirestoreSnapshot<OfferDocumentData> } = {
  LyCfl6Eg7JKuD7XJ6IPi: {
    ref: offerReferenceMock['LyCfl6Eg7JKuD7XJ6IPi']!,
    id: offerReferenceMock['LyCfl6Eg7JKuD7XJ6IPi']!.id,
    exists: true,
    data: () => offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']
  } as unknown as FirestoreSnapshot<OfferDocumentData>
}
