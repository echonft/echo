import { listingTargetCollectionEquals } from '../../src/predicates/listing-target-collection-equals'
import { getListingMockById } from '../mocks/get-listing-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('predicates - listingTargetCollectionEquals', () => {
  it('returns false if collection id is not the same as the target', async () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    expect(listingTargetCollectionEquals('not-found')(listing.targets[0])).toBeFalsy()
  })
  it('returns true if collection id is the same as the target', async () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    expect(listingTargetCollectionEquals('Rc8pLQXxgyQGIRL0fr13')(listing.targets[0])).toBeTruthy()
  })
})
