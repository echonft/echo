// noinspection JSUnusedGlobalSymbols

import { collectionMockPxId } from '@echo/model/mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { CollectionTile as Component } from '@echo/ui/components/collection/tile/collection-tile'
import { Size } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'
import { pipe, prop } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Tile',
  component: Component,
  argTypes: {
    size: {
      options: [Size.MD, Size.LG],
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
    slug: pipe(getCollectionMockById, prop('slug'))(collectionMockPxId()),
    name: pipe(getCollectionMockById, prop('name'))(collectionMockPxId()),
    pictureUrl: pipe(getCollectionMockById, prop('profilePictureUrl'))(collectionMockPxId()),
    size: Size.LG,
    swapsCount: 2
  }
}
