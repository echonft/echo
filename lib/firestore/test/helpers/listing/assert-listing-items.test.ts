import { assertListingItems } from '../../../src/helpers/listing/assert-listing-items'
import { getListingMockById } from '../../mocks/get-listing-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { assocPath } from 'ramda'

describe('helpers - listing - assertListingItems', () => {
  it('throws if not all the items are from the same collection', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const item = listing.items[0]
    const differentCollectionItem = assocPath(['collection', 'id'], 'other-collection', item)
    expect(() => assertListingItems([item, differentCollectionItem])).toThrow()
  })

  it('throws if some items have the same token id', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const item = listing.items[0]
    const differentItem = { ...item, tokenId: 0 }
    expect(() => assertListingItems([item, differentItem, item])).toThrow()
  })

  it('throws if all items do not have the same wallet', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const item = listing.items[0]
    const differentWalletItem = assocPath(['owner', 'wallet'], { address: '0xanotheraddress', chainId: 1 }, item)
    expect(() => assertListingItems([item, differentWalletItem])).toThrow()
  })

  it('does not throw if items are from the same collection, have the same wallet and all have different token ids', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const item = listing.items[0]
    const differentItem = { ...item, tokenId: 0 }
    expect(() => assertListingItems([item, differentItem])).not.toThrow()
  })
})
