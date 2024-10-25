// noinspection JSUnusedGlobalSymbols

import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { CollectionTile as Component } from '@echo/ui/components/collection/tile/collection-tile'
import { Size } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

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
    slug: collectionMockPx.slug,
    name: collectionMockPx.name,
    pictureUrl: collectionMockPx.profilePictureUrl,
    size: Size.LG,
    swapsCount: 2
  }
}
