// noinspection JSUnusedGlobalSymbols

import { type Collection } from '@echo/model/types/collection'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { RankedCollections as Component } from '@echo/ui/pages/home/collection/ranked/ranked-collections'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, concat, map, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Home/Ranked Collections',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collections']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const collections = map(pipe(assoc('swapsCount', 2)), getAllCollectionMocks()) as Collection[]

export const Default: Story = {
  args: {
    collections: concat(collections, collections)
  }
}
