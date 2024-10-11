import { collectionSwapsCountMock } from '@echo/firestore/mocks/collection-swaps-count/collection-swaps-count-mock'
import { type CollectionSwapsCountDocumentData } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count-document-data'
import { type NonEmptyArray } from 'ramda'

export function getAllCollectionSwapsCountMocks() {
  return Object.values(collectionSwapsCountMock()) as NonEmptyArray<CollectionSwapsCountDocumentData>
}
