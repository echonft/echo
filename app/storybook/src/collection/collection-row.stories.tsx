// noinspection JSUnusedGlobalSymbols

import { type Collection } from '@echo/model/types/collection'
import { getCollectionMock } from '@echo/model-mocks/collection/get-collection-mock'
import { CollectionRow as Component } from '@echo/ui/components/collection/row/collection-row'
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

export const Row: StoryObj<typeof Component> = {
  args: {
    collection: pipe<[], Collection, Collection, CollectionWithRank>(
      getCollectionMock,
      assoc('swapsCount', 1),
      assoc('rank', 1)
    )()
  }
}
