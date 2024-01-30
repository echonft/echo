// noinspection JSUnusedGlobalSymbols

import { type Collection } from '@echo/model/types/collection'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { HomepageRankedCollections as Component } from '@echo/ui/pages/home/collection/ranked/homepage-ranked-collections'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { type Meta, type StoryObj } from '@storybook/react'
import { addIndex, assoc, concat, descend, map, pipe, prop, sortWith, take } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home/Components/Ranked Collections',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collections', 'firstRank']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    collections: pipe<
      [],
      Collection[],
      Collection[],
      Collection[],
      Collection[],
      Collection[],
      Collection[],
      Collection[]
    >(
      getAllCollectionMocks,
      concat(getAllCollectionMocks()),
      concat(getAllCollectionMocks()),
      concat(getAllCollectionMocks()),
      addIndex(map)((collection, index) => assoc('swapsCount', index, collection)),
      sortWith([descend(nonNullableReturn(prop('swapsCount')))]),
      take(4)
    )(),
    firstRank: 6
  }
}
