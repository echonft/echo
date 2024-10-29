// noinspection JSUnusedGlobalSymbols

import { collectionMocks } from '@echo/model/mocks/collection-mock'
import { swapMocks } from '@echo/model/mocks/swap-mock'
import { type Collection } from '@echo/model/types/collection'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { usePageLayoutStore } from '@echo/ui/hooks/use-page-layout-store'
import { HomePage as Component } from '@echo/ui/pages/home/home-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { type Meta, type StoryObj } from '@storybook/react'
import { addIndex, assoc, concat, map, pipe } from 'ramda'
import { useEffect } from 'react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home',
  component: Component,
  decorators: [
    (Story) => (
      <PageLayout>
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
    collections: pipe<[Collection[]], Collection[], Collection[], Collection[], CollectionWithRank[]>(
      concat(collectionMocks),
      concat(collectionMocks),
      concat(collectionMocks),
      addIndex(map)((collection, index) => pipe(assoc('swapsCount', 50 - index), assoc('rank', index + 1))(collection))
    )(collectionMocks),
    swaps: pipe(concat(swapMocks), concat(swapMocks), concat(swapMocks), concat(swapMocks))(swapMocks)
  },
  render: ({ collections, swaps }) => {
    const setBackground = usePageLayoutStore((state) => state.setBackground)

    useEffect(() => {
      setBackground(PageLayoutBackground.Home)
      return (): void => {
        setBackground(PageLayoutBackground.Default)
      }
    }, [setBackground])

    return <Component collections={collections} swaps={swaps} />
  }
}
