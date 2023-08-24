import { assertListingTargets } from '../../../src/helpers/listing/assert-listing-targets'
import { ListingTarget } from '../../../src/types/model/listing-target'
import { getListingMockById } from '../../mocks/get-listing-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { assocPath, pipe } from 'ramda'

describe('helpers - listing - assertListingTargets', () => {
  it('throws if some targets have the same id', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const target = listing.targets[0]
    expect(() => assertListingTargets([target, target])).toThrow()
  })

  it('does not throw if all targets have different collection ids', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const target = listing.targets[0]
    const differentTarget = pipe(assocPath(['collection', 'id'], 'different-id'))(target) as ListingTarget
    expect(() => assertListingTargets([target, differentTarget])).not.toThrow()
  })
})
