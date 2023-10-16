import type { Collection } from '@echo/model/types/collection'
import { assertCollection } from '@server/helpers/collection/assert-collection'

describe('helpers - collection - assertCollection', () => {
  it('throws if collection is undefined', () => {
    expect(() => assertCollection(undefined)).toThrow()
  })
  it('does not throw if collection is defined', () => {
    expect(() => assertCollection({ id: 'collectionId' } as Collection)).not.toThrow()
  })
})
