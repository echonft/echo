import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { listingMock } from '@echo/model/mocks/listing-mock'

export const listingDocumentMock: ListingDocument = {
  ...listingMock,
  itemCollections: [collectionMockSpiral.slug],
  itemIndexes: [`${collectionMockSpiral.slug}.1`, `${collectionMockSpiral.slug}.2`],
  signature: 'a7e5c4e564e9a6c74571dfe9f770c135e20c3a94'
}
