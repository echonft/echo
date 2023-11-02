import { assertCollectionExists } from '@echo/frontend/lib/server/helpers/collection/assert-collection-exists'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'

describe('helpers - collection - assertCollectionExists', () => {
  it('throws if collection is undefined', () => {
    expect(() => assertCollectionExists(undefined, 'slug')).toThrow()
  })
  it('does not throw if collection is defined', () => {
    expect(() => assertCollectionExists(getCollectionMockById('Rc8pLQXxgyQGIRL0fr13'), 'slug')).not.toThrow()
  })
})
