import { offerDocumentDataMock } from '@echo/firestore-mocks/offer-document-data-mock'

export function getOfferDocumentDataMockById(id: string) {
  return offerDocumentDataMock[id]!
}
