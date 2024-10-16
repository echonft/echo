import { collectionMock } from '@echo/model/mocks/collection/collection-mock'
import { type Collection } from '@echo/model/types/collection/collection'
import { type NonEmptyArray } from 'ramda'

export function getAllCollectionMocks() {
  return Object.values(collectionMock()) as NonEmptyArray<Collection>
}
