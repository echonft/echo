import { RequestForOfferDocumentData } from '../../src/types/model/document-data/request-for-offer-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const requestForOfferReferenceMock: { [key: string]: DocumentReference<RequestForOfferDocumentData> } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    path: 'request-for-offers/jUzMtPGKM62mMhEcmbN4'
  } as unknown as DocumentReference<RequestForOfferDocumentData>
}
