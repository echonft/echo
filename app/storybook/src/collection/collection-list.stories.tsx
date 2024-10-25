// noinspection JSUnusedGlobalSymbols

import { collectionMocks } from '@echo/model/mocks/collection-mock'
import { type Collection } from '@echo/model/types/collection'
import { CollectionList as Component } from '@echo/ui/components/collection/row/collection-list'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { type Meta, type StoryObj } from '@storybook/react'
import { addIndex, assoc, concat, map, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Collection/List',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collections']
    }
  }
}

export default metadata

export const List: StoryObj<typeof Component> = {
  args: {
    collections: pipe<[Collection[]], Collection[], Collection[], Collection[], CollectionWithRank[]>(
      concat(collectionMocks),
      concat(collectionMocks),
      concat(collectionMocks),
      addIndex(map)((collection, index) => pipe(assoc('swapsCount', 50 - index), assoc('rank', index + 1))(collection))
    )(collectionMocks)
  }
}
