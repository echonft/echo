// noinspection JSUnusedGlobalSymbols

import { listingMock } from '@echo/model/mocks/listing-mock'
import { nftMocks } from '@echo/model/mocks/nft-mock'
import { offerMocks } from '@echo/model/mocks/offer-mock'
import { swapMocks } from '@echo/model/mocks/swap-mock'
import { userMockCrew } from '@echo/model/mocks/user-mock'
import { ProfilePage as Component } from '@echo/ui/pages/profile/profile-page'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, map } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Profile',
  component: Component,
  args: {
    counts: {
      offersCount: 4,
      listingsCount: 8,
      nftsCount: 666,
      swapsCount: 1
    },
    listings: [assoc('role', undefined, listingMock)],
    pendingListings: [assoc('role', undefined, listingMock)],
    nfts: nftMocks,
    offers: map(assoc('role', undefined), offerMocks),
    swaps: map(assoc('role', undefined), swapMocks),
    user: userMockCrew
  },
  parameters: {
    controls: {
      exclude: ['counts', 'listings', 'pendingListings', 'nfts', 'offers', 'swaps', 'user', 'selection']
    }
  }
}

export default metadata

export const Page: StoryObj<typeof Component> = {}

export const WithSelectedSwap: StoryObj<typeof Component> = {
  args: {
    selection: 0
  }
}
