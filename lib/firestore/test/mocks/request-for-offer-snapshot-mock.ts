import { FirestoreSnapshot } from '../../src/types/abstract/firestore-snapshot'
import { RequestForOfferDocumentData } from '../../src/types/model/document-data/request-for-offer-document-data'
import { requestForOfferReferenceMock } from './request-for-offer-reference-mock'

export const requestForOfferSnapshotMock: { [key: string]: FirestoreSnapshot<RequestForOfferDocumentData> } = {
  jUzMtPGKM62mMhEcmbN4: {
    ref: requestForOfferReferenceMock['jUzMtPGKM62mMhEcmbN4']!,
    id: requestForOfferReferenceMock['jUzMtPGKM62mMhEcmbN4']!.id,
    exists: true,
    data: () => requestForOfferReferenceMock['jUzMtPGKM62mMhEcmbN4']
  } as unknown as FirestoreSnapshot<RequestForOfferDocumentData>
}
