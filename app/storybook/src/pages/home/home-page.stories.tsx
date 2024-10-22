// noinspection JSUnusedGlobalSymbols

import { getAllCollectionMocks } from '@echo/model/mocks/collection/get-all-collection-mocks'
import { getAllOfferMocks } from '@echo/model/mocks/offer/get-all-offer-mocks'
import { type Collection } from '@echo/model/types/collection/collection'
import type { Swap } from '@echo/model/types/swap/swap'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { Background } from '@echo/ui/constants/background'
import { HomePage as Component } from '@echo/ui/pages/home/home-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { type Meta, type StoryObj } from '@storybook/react'
import { addIndex, assoc, concat, map, pipe, take } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home',
  component: Component,
  decorators: [
    (Story) => (
      <PageLayout background={Background.Home} excludeProviders={true}>
        <Story />
      </PageLayout>
    )
  ],
  parameters: {
    controls: {
      exclude: ['collections', 'swaps']
    }
  }
}

export default metadata

export const Page: StoryObj<typeof Component> = {
  args: {
    collections: pipe<[], Collection[], Collection[], Collection[], Collection[], CollectionWithRank[]>(
      getAllCollectionMocks,
      concat(getAllCollectionMocks()),
      concat(getAllCollectionMocks()),
      concat(getAllCollectionMocks()),
      addIndex(map)((collection, index) => pipe(assoc('swapsCount', 50 - index), assoc('rank', index + 1))(collection))
    )(),
    swaps: pipe(getAllOfferMocks, concat(getAllOfferMocks()), concat(getAllOfferMocks()), take(5))() as Swap[]
  }
}
