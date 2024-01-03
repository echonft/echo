import type { OfferItem } from '@echo/model/types/offer-item'
import { unselectNftGroupsFromItems } from '@echo/ui/helpers/nft/unselect-nfts-group-from-items'
import type { Group } from '@echo/ui/types/group'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { describe, expect, it } from '@jest/globals'

describe('helpers - nft - unselectNftGroupsFromItems', () => {
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
    const nftGroups: Group<SelectableNft>[] = [
      {
        id: 'group1',
        name: 'Group 1',
        items: [nft1, nft2]
      },
      { id: 'group1', name: 'Group 2', items: [nft3] }
    ]
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
    const newNftGroups = unselectNftGroupsFromItems(nftGroups, offerItems)
    expect(newNftGroups.length).toEqual(nftGroups.length)
    expect(newNftGroups[0]!.items[0]!.selected).toBeTruthy()
    expect(newNftGroups[0]!.items[1]!.selected).toBeTruthy()
    expect(newNftGroups[1]!.items[0]!.selected).toBeUndefined()
  })

  it('should deselect all nfts if no offer items are provided', () => {
    const nftGroups: Group<SelectableNft>[] = [
      {
        id: 'group1',
        name: 'Group 1',
        items: [nft1, nft2]
      },
      { id: 'group1', name: 'Group 2', items: [nft3] }
    ]
    const offerItems: OfferItem[] = []
    const newNftGroups = unselectNftGroupsFromItems(nftGroups, offerItems)
    expect(newNftGroups.length).toEqual(nftGroups.length)
    expect(newNftGroups[0]!.items[0]!.selected).toBeUndefined()
    expect(newNftGroups[0]!.items[1]!.selected).toBeUndefined()
    expect(newNftGroups[1]!.items[0]!.selected).toBeUndefined()
  })

  it('should return an empty array if no nfts are provided', () => {
    const offerItems: OfferItem[] = []

    expect(unselectNftGroupsFromItems([], offerItems)).toEqual([])
  })

  it('should not modify the original nfts array if all items are selected', () => {
    const nftGroups: Group<SelectableNft>[] = [
      {
        id: 'group1',
        name: 'Group 1',
        items: [nft1, nft2]
      },
      { id: 'group1', name: 'Group 2', items: [nft3] }
    ]
    const offerItems: OfferItem[] = [
      { amount: 1, nft: nft1 },
      { amount: 1, nft: nft2 },
      { amount: 1, nft: nft3 }
    ]
    expect(unselectNftGroupsFromItems(nftGroups, offerItems)).toEqual(nftGroups)
  })
})
