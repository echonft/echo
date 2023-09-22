import { listingPostDocumentDataMock } from '@echo/firestore-mocks/listing-post/listing-post-document-data-mock'

export function getListingPostDocumentDataMockById(id: string) {
  return listingPostDocumentDataMock[id]!
}
