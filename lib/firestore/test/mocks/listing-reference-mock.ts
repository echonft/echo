import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import type { DocumentReference } from 'firebase-admin/lib/firestore'

export const listingReferenceMock: { [key: string]: DocumentReference<ListingDocumentData> } = {
  jUzMtPGKM62mMhEcmbN4: {
    id: 'jUzMtPGKM62mMhEcmbN4',
    path: 'listings/jUzMtPGKM62mMhEcmbN4'
  } as unknown as DocumentReference<ListingDocumentData>
}
