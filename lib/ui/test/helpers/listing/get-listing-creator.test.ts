import { getListingCreator } from '@echo/ui/helpers/listing/get-listing-creator'
import type { Listing } from '@echo/ui/types/model/listing'
import type { ListingItem } from '@echo/ui/types/model/listing-item'
import type { UserDetails } from '@echo/ui/types/model/user-details'
import type { Wallet } from '@echo/ui/types/model/wallet'
import { describe, expect, it } from '@jest/globals'

describe('helpers - listing - getListingCreator', () => {
  it('returns the wallet of the first item since they are all the same', () => {
    const wallet: Wallet = {
      address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
      chainId: 1
    }
    const owner: UserDetails = {
      discordAvatar: 'discordAvatar',
      discordBanner: 'discordBanner',
      discordId: 'discordId',
      discordUsername: 'discordUsername',
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
