import { ListingDocumentData } from '../../src/types/model/listing-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const listingReferenceMock: { [key: string]: DocumentReference<ListingDocumentData> } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    path: 'listings/jUzMtPGKM62mMhEcmbN4'
  } as unknown as DocumentReference<ListingDocumentData>
}
