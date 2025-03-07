// noinspection JSUnusedGlobalSymbols

import { collectionMocks } from '@echo/model/mocks/collection-mock'
import { swapMock } from '@echo/model/mocks/swap-mock'
import { type Collection } from '@echo/model/types/collection'
import { Header } from '@echo/ui/components/base/header/header'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { HomePage as Component } from '@echo/ui/pages/home/home-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { type Meta, type StoryObj } from '@storybook/react'
import { addIndex, assoc, concat, map, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home',
  component: Component,
  args: {
    collections: pipe<[Collection[]], Collection[], Collection[], Collection[], CollectionWithRank[]>(
      concat(collectionMocks),
      concat(collectionMocks),
      concat(collectionMocks),
      addIndex(map)((collection, index) => pipe(assoc('swapsCount', 50 - index), assoc('rank', index + 1))(collection))
    )(collectionMocks),
    swaps: [
      assoc('role', undefined, swapMock),
      assoc('role', undefined, swapMock),
      assoc('role', undefined, swapMock),
      assoc('role', undefined, swapMock),
      assoc('role', undefined, swapMock)
    ]
  },
  decorators: [
    (Story) => (
      <PageLayout background={PageLayoutBackground.Home}>
        <Header />
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

export const Page: StoryObj<typeof Component> = {}
