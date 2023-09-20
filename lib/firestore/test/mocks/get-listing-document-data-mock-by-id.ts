import { listingDocumentDataMock } from '@echo/firestore-mocks/listing-document-data-mock'

export function getListingDocumentDataMockById(id: string) {
  return listingDocumentDataMock[id]!
}
