import { removeItemFromNewListing } from '../../src/helpers/remove-item-from-new-listing'
import { ListingItem, NewListing } from '@echo/ui-model'
import { describe, expect, it } from '@jest/globals'

describe('helpers - removeItemFromNewListing', () => {
  it('remove the right item', () => {
    const item1 = { nft: { id: '1' } } as ListingItem
    const item2 = { nft: { id: '2' } } as ListingItem
    const item3 = { nft: { id: '3' } } as ListingItem
    const listing = {
      items: [item1, item2, item3],
      targets: []
    } as NewListing
    expect(removeItemFromNewListing(item2)(listing)).toStrictEqual({
      items: [item1, item3],
      targets: []
    })
  })

  it('does not remove if item is not in list', () => {
    const item1 = { nft: { id: '1' } } as ListingItem
    const item2 = { nft: { id: '2' } } as ListingItem
    const item3 = { nft: { id: '3' } } as ListingItem
    const listing = {
      items: [item1, item2],
      targets: []
    } as NewListing
    expect(removeItemFromNewListing(item3)(listing)).toStrictEqual({
      items: [item1, item2],
      targets: []
    })
  })

  it('removes last item', () => {
    const item1 = { nft: { id: '1' } } as ListingItem
    const listing = {
      items: [item1],
      targets: []
    } as NewListing
    expect(removeItemFromNewListing(item1)(listing)).toStrictEqual({
      items: [],
      targets: []
    })
  })
})
