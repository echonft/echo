import { removeTargetFromNewListing } from '../../src/helpers/remove-target-from-new-listing'
import { ListingTarget, NewListing } from '@echo/ui-model'
import { describe, expect, it } from '@jest/globals'

describe('helpers - removeTargetFromNewListing', () => {
  it('remove the right target', () => {
    const target1 = { collection: { id: '1' } } as ListingTarget
    const target2 = { collection: { id: '2' } } as ListingTarget
    const target3 = { collection: { id: '3' } } as ListingTarget
    const listing = {
      items: [],
      targets: [target1, target2, target3]
    } as NewListing
    expect(removeTargetFromNewListing(target2)(listing)).toStrictEqual({
      items: [],
      targets: [target1, target3]
    })
  })

  it('does not remove if target is not in list', () => {
    const target1 = { collection: { id: '1' } } as ListingTarget
    const target2 = { collection: { id: '2' } } as ListingTarget
    const target3 = { collection: { id: '3' } } as ListingTarget
    const listing = {
      items: [],
      targets: [target1, target2]
    } as NewListing
    expect(removeTargetFromNewListing(target3)(listing)).toStrictEqual({
      items: [],
      targets: [target1, target2]
    })
  })

  it('removes last target', () => {
    const target1 = { collection: { id: '1' } } as ListingTarget
    const listing = {
      items: [],
      targets: [target1]
    } as NewListing
    expect(removeTargetFromNewListing(target1)(listing)).toStrictEqual({
      items: [],
      targets: []
    })
  })
})
