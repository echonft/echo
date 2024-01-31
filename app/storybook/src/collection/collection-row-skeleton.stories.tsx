// noinspection JSUnusedGlobalSymbols

import { type Collection } from '@echo/model/types/collection'
import { getCollectionMock } from '@echo/model-mocks/collection/get-collection-mock'
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
    collection: pipe<[], Collection, CollectionWithRank>(getCollectionMock, assoc('rank', 1))()
  }
}
