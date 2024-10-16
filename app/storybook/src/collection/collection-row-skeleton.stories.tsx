// noinspection JSUnusedGlobalSymbols

import { getCollectionMock } from '@echo/model/mocks/collection/get-collection-mock'
import { type Collection } from '@echo/model/types/collection/collection'
import type { CollectionWithSwapsCount } from '@echo/model/types/collection/collection-with-swaps-count'
import { CollectionRowSkeleton as Component } from '@echo/ui/components/collection/row/skeleton/collection-row-skeleton'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Row',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collection']
    }
  }
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {
  args: {
    collection: pipe<[], Collection, CollectionWithSwapsCount, CollectionWithRank>(
      getCollectionMock,
      assoc('swapsCount', 1),
      assoc('rank', 1)
    )()
  }
}
