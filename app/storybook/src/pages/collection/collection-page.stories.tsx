// noinspection JSUnusedGlobalSymbols

import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { nftMocks } from '@echo/model/mocks/nft-mock'
import { offerMocks } from '@echo/model/mocks/offer-mock'
import { swapMocks } from '@echo/model/mocks/swap-mock'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { CollectionPage as Component } from '@echo/ui/pages/collection/collection-page'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, map } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Collection',
  component: Component,
  args: {
    collection: collectionMockPx,
    counts: {
      offersCount: 4,
      listingsCount: 8,
      nftsCount: 666,
      swapsCount: 1
    },
    listings: [assoc('role', undefined, listingMock)],
    nfts: nftMocks,
    offers: map(assoc('role', undefined), offerMocks),
    swaps: swapMocks
  },
  decorators: [
    (Story) => (
      <PageLayout>
        <Header />
        <MainSectionLayout>
          <Story />
          <CalloutManager />
        </MainSectionLayout>
      </PageLayout>
    )
  ],
  parameters: {
    controls: {
      exclude: ['collection', 'counts', 'listings', 'nfts', 'offers', 'swaps']
    }
  }
}

export default metadata

export const Page: StoryObj<typeof Component> = {}

export const WithSelectedListing: StoryObj<typeof Component> = {
  args: {
    selection: 0
  }
}
