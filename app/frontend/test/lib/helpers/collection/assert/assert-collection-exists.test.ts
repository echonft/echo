import { assertCollectionExists } from '@echo/frontend/lib/helpers/collection/assert/assert-collection-exists'
import { collectionMockPxId } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'

describe('helpers - collection - assertCollectionExists', () => {
  it('throws if collection is undefined', () => {
    expect(() => {
      assertCollectionExists(undefined, 'slug')
    }).toThrow()
  })
  it('does not throw if collection is defined', () => {
    expect(() => {
      assertCollectionExists(getCollectionMockById(collectionMockPxId()), 'slug')
    }).not.toThrow()
  })
})
