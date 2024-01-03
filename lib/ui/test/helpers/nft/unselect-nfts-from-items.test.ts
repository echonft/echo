import type { OfferItem } from '@echo/model/types/offer-item'
import { unselectNftsFromItems } from '@echo/ui/helpers/nft/unselect-nfts-from-items'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { describe, expect, it } from '@jest/globals'

describe('helpers - nft - unselectNftsFromItems', () => {
  const nft1 = {
    id: '8hHFadIrrooORfTOLkBg',
    attributes: [],
    selected: true
  } as unknown as SelectableNft
  const nft2 = {
    id: 'iRZFKEujarikVjpiFAkE',
    attributes: [],
    selected: true
  } as unknown as SelectableNft
  const nft3 = {
    id: '5SeF1NSN5uPUxtWSr516',
    attributes: [],
    selected: true
  } as unknown as SelectableNft
  it('should deselect (partly) nfts that are not in the items', () => {
    const nfts = [nft1, nft2, nft3]
    const offerItems: OfferItem[] = [
      {
        amount: 1,
        nft: nft1
      },
      {
        amount: 1,
        nft: nft2
      }
    ]
    const newNfts = unselectNftsFromItems(nfts, offerItems)
    expect(newNfts.length).toEqual(nfts.length)
    expect(newNfts[0]!.selected).toBeTruthy()
    expect(newNfts[1]!.selected).toBeTruthy()
    expect(newNfts[2]!.selected).toBeUndefined()
  })

  it('should deselect all nfts if no offer items are provided', () => {
    const nfts = [nft1, nft2, nft3]
    const offerItems: OfferItem[] = []
    const newNfts = unselectNftsFromItems(nfts, offerItems)
    expect(newNfts.length).toEqual(3)
    expect(newNfts[0]!.selected).toBeUndefined()
    expect(newNfts[1]!.selected).toBeUndefined()
    expect(newNfts[2]!.selected).toBeUndefined()
  })

  it('should return an empty array if no nfts are provided', () => {
    const offerItems: OfferItem[] = []

    expect(unselectNftsFromItems([], offerItems)).toEqual([])
  })

  it('should not modify the original nfts array if all items are selected', () => {
    const nfts = [nft1, nft2, nft3]
    const offerItems: OfferItem[] = [
      { amount: 1, nft: nft1 },
      { amount: 1, nft: nft2 },
      { amount: 1, nft: nft3 }
    ]
    expect(unselectNftsFromItems(nfts, offerItems)).toEqual(nfts)
  })
})
