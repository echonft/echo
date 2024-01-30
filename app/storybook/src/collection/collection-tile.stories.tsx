// noinspection JSUnusedGlobalSymbols

import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { CollectionTile as Component } from '@echo/ui/components/collection/tile/collection-tile'
import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'
import { pipe, prop } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Tile',
  component: Component,
  argTypes: {
    size: {
      options: [SIZE_MD, SIZE_LG],
      control: { type: 'radio' }
    }
  },
  parameters: {
    controls: {
      exclude: ['slug', 'pictureUrl']
    }
  }
}

export default metadata

export const Tile: StoryObj<typeof Component> = {
  args: {
    slug: pipe(getCollectionMockById, prop('slug'))('Rc8pLQXxgyQGIRL0fr13'),
    name: pipe(getCollectionMockById, prop('name'))('Rc8pLQXxgyQGIRL0fr13'),
    pictureUrl: pipe(getCollectionMockById, prop('profilePictureUrl'))('Rc8pLQXxgyQGIRL0fr13'),
    size: SIZE_LG,
    swapsCount: 2
  }
}
