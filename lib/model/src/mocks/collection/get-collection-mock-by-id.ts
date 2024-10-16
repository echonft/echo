import { collectionMock } from '@echo/model/mocks/collection/collection-mock'
import type { Collection } from '@echo/model/types/collection/collection'
import { isNil } from 'ramda'

export function getCollectionMockById(id: string): Collection {
  const mock = collectionMock()[id]
  if (isNil(mock)) {
    throw Error(`wrong collection mock id: ${id}`)
  }
  return mock
}
