import { guarded_assertCollectionExists } from '@echo/frontend/lib/server/helpers/collection/assert/guarded_assert-collection-exists'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'

describe('helpers - collection - guarded_assertCollectionExists', () => {
  it('throws if collection is undefined', () => {
    expect(() => guarded_assertCollectionExists(undefined, 'slug')).toThrow()
  })
  it('does not throw if collection is defined', () => {
    expect(() => guarded_assertCollectionExists(getCollectionMockById('Rc8pLQXxgyQGIRL0fr13'), 'slug')).not.toThrow()
  })
})
