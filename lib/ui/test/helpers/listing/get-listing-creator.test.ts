import { getListingCreator } from '@echo/ui/helpers/listing/get-listing-creator'
import type { Listing } from '@echo/ui/types/model/listing'
import type { ListingItem } from '@echo/ui/types/model/listing-item'
import type { User } from '@echo/ui/types/model/user'
import type { Wallet } from '@echo/ui/types/model/wallet'
import { describe, expect, it } from '@jest/globals'
import { getAddress } from 'viem'

describe('helpers - listing - getListingCreator', () => {
  it('returns the wallet of the first item since they are all the same', () => {
    const wallet: Wallet = {
      address: getAddress('0xf672715f2bA85794659a7150e8C21F8d157bFe1D', 1),
      chainId: 1
    }
    const owner: User = {
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/462798252543049728/6b3df6d9a8b5ab523fa24a71aca8160d.png',
        username: 'johnnycagewins'
      },
      username: 'username',
      wallet
    }
    const listingItem = {
      nft: {
        owner
      }
    } as ListingItem
    const listing = {
      items: [listingItem, listingItem, listingItem]
    } as unknown as Listing

    expect(getListingCreator(listing)).toStrictEqual(owner)
  })
})
