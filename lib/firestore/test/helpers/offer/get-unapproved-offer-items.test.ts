import { getUnapprovedOfferItems } from '../../../src/helpers/offer/get-unapproved-offer-items'
import { OfferItem } from '../../../src/types/model/offer-item'
import { describe, expect, it } from '@jest/globals'
import { includes, map, path } from 'ramda'

describe('helpers - offer - getUnapprovedOfferItems', () => {
  const item1 = {
    approved: true,
    nft: {
      id: 'item1'
    }
  } as OfferItem
  const item2 = {
    approved: true,
    nft: {
      id: 'item2'
    }
  } as OfferItem
  const item3 = {
    approved: false,
    nft: {
      id: 'item3'
    }
  } as OfferItem
  const item4 = {
    approved: false,
    nft: {
      id: 'item4'
    }
  } as OfferItem

  it('empty array returns an empty array', () => {
    expect(getUnapprovedOfferItems([])).toEqual([])
  })
  it('only approved items returns an empty array', () => {
    expect(getUnapprovedOfferItems([item1])).toEqual([])
    expect(getUnapprovedOfferItems([item1, item2])).toEqual([])
  })
  it('1 unapproved item returns an array containing only this item', () => {
    const result = getUnapprovedOfferItems([item1, item2, item3])
    expect(result.length).toEqual(1)
    expect(result[0]!.nft.id).toEqual('item3')
  })
  it('multiple unapproved items returns these items', () => {
    const result = getUnapprovedOfferItems([item1, item2, item3, item4])
    expect(result.length).toEqual(2)
    const nftIds = map(path(['nft', 'id']), result)
    expect(includes('item3', nftIds)).toBeTruthy()
    expect(includes('item4', nftIds)).toBeTruthy()
  })
})
