// noinspection JSUnusedGlobalSymbols

import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { nftMocks } from '@echo/model/mocks/nft-mock'
import { offerMocks } from '@echo/model/mocks/offer-mock'
import { swapMocks } from '@echo/model/mocks/swap-mock'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { NavigationLayout } from '@echo/ui/components/base/layout/navigation-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { CollectionDetails } from '@echo/ui/components/collection/details/collection-details'
import { CollectionTabs } from '@echo/ui/pages/collection/collection-tabs'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, map, pipe } from 'ramda'

const metadata: Meta = {
  title: 'Pages/Collection',
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
  ]
}

export default metadata

export const Page: StoryObj = {
  render: () => {
    const collection = pipe(
      assoc('offersCount', 4),
      assoc('listingsCount', 8),
      assoc('nftsCount', 666),
      assoc('swapsCount', 1)
    )(collectionMockPx)
    return (
      <NavigationLayout>
        <SectionLayout>
          <CollectionDetails collection={collection} />
        </SectionLayout>
        <NavigationSectionLayout>
          <CollectionTabs
            collection={collection}
            listings={[assoc('role', undefined, listingMock)]}
            nfts={nftMocks}
            offers={map(assoc('role', undefined), offerMocks)}
            swaps={swapMocks}
          />
        </NavigationSectionLayout>
      </NavigationLayout>
    )
  }
}
