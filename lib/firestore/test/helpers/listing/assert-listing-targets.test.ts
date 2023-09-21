import { assertListingTargets } from '@echo/firestore/helpers/listing/assert/assert-listing-targets'
import type { FirestoreListingTarget } from '@echo/firestore/types/model/listing/firestore-listing-target'
import { getListingMockById } from '@echo/firestore-mocks/listing/get-listing-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { assocPath, pipe } from 'ramda'

describe('helpers - listing - assert - assertListingTargets', () => {
  it('throws if some targets have the same id', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const target = listing.targets[0]
    expect(() => assertListingTargets([target, target])).toThrow()
  })

  it('does not throw if all targets have different collection ids', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const target = listing.targets[0]
    const differentTarget = pipe(assocPath(['collection', 'id'], 'different-id'))(target) as FirestoreListingTarget
    expect(() => assertListingTargets([target, differentTarget])).not.toThrow()
  })
})
