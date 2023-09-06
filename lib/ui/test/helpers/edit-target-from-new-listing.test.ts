import { editTargetFromNewListing } from '../../src/helpers/edit-target-from-new-listing'
import { ListingTarget, NewListing } from '@echo/ui-model'
import { describe, expect, it } from '@jest/globals'

describe('helpers - editTargetFromNewListing', () => {
  it('edit the right target', () => {
    const target1 = { collection: { id: '1' }, amount: 1 } as ListingTarget
    const target2 = { collection: { id: '2' }, amount: 1 } as ListingTarget
    const target3 = { collection: { id: '3' }, amount: 1 } as ListingTarget
    const newTarget3 = { collection: { id: '3' }, amount: 10 } as ListingTarget
    const listing = {
      items: [],
      targets: [target1, target2, target3]
    } as NewListing
    expect(editTargetFromNewListing(newTarget3)(listing)).toStrictEqual({
      items: [],
      targets: [target1, target2, newTarget3]
    })
  })

  it('does not edit if target is not in list', () => {
    const target1 = { collection: { id: '1' }, amount: 1 } as ListingTarget
    const target2 = { collection: { id: '2' }, amount: 1 } as ListingTarget
    const newTarget3 = { collection: { id: '3' }, amount: 10 } as ListingTarget
    const listing = {
      items: [],
      targets: [target1, target2]
    } as NewListing
    expect(editTargetFromNewListing(newTarget3)(listing)).toStrictEqual({
      items: [],
      targets: [target1, target2]
    })
  })

  it('edits if only 1 target', () => {
    const target1 = { collection: { id: '1' }, amount: 1 } as ListingTarget
    const newTarget1 = { collection: { id: '1' }, amount: 10 } as ListingTarget
    const listing = {
      items: [],
      targets: [target1]
    } as NewListing
    expect(editTargetFromNewListing(newTarget1)(listing)).toStrictEqual({
      items: [],
      targets: [newTarget1]
    })
  })
})
