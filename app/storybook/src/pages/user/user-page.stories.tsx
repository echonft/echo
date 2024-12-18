// noinspection JSUnusedGlobalSymbols

import { listingMock } from '@echo/model/mocks/listing-mock'
import { nftMocks } from '@echo/model/mocks/nft-mock'
import { offerMocks } from '@echo/model/mocks/offer-mock'
import { swapMocks } from '@echo/model/mocks/swap-mock'
import { userMockCrew } from '@echo/model/mocks/user-mock'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { UserPage as Component } from '@echo/ui/pages/user/user-page'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, map } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/User',
  component: Component,
  args: {
    counts: {
      offersCount: 4,
      listingsCount: 8,
      nftsCount: 666,
      swapsCount: 1
    },
    listings: [assoc('role', undefined, listingMock)],
    nfts: nftMocks,
    offers: map(assoc('role', undefined), offerMocks),
    swaps: map(assoc('role', undefined), swapMocks),
    user: userMockCrew
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
      exclude: ['counts', 'listings', 'nfts', 'offers', 'swaps', 'user']
    }
  }
}

export default metadata

export const Page: StoryObj<typeof Component> = {}
