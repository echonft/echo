// noinspection JSUnusedGlobalSymbols

import { type Collection } from '@echo/model/types/collection'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { HomeCollections as Component } from '@echo/ui/pages/home/collection/home-collections'
import { type Meta, type StoryObj } from '@storybook/react'
import { addIndex, assoc, concat, map, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home/Components/Collections',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collections']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {
  args: {
    collections: pipe<[], Collection[], Collection[], Collection[], Collection[], Collection[]>(
      getAllCollectionMocks,
      concat(getAllCollectionMocks()),
      concat(getAllCollectionMocks()),
      concat(getAllCollectionMocks()),
      addIndex(map)((collection, index) => assoc('swapsCount', index, collection))
    )()
  }
}
