import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { listingMock } from '@echo/model/mocks/listing-mock'

export const listingDocumentMock: ListingDocument = {
  ...listingMock,
  itemCollections: [collectionMockSpiral.slug],
  itemIndexes: [`${collectionMockSpiral.slug}.1`, `${collectionMockSpiral.slug}.2`],
  signature: '912033ed05750bcf8aa74126011cbdef5a907424'
}
