import { offerPostDocumentDataMock } from '@echo/firestore-mocks/offer-post/offer-post-document-data-mock'

export function getOfferPostDocumentDataMockById(id: string) {
  return offerPostDocumentDataMock[id]!
}
