// noinspection JSUnusedGlobalSymbols

import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { CollectionTile as Component } from '@echo/ui/components/collection/tile/collection-tile'
import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

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

type Story = StoryObj<typeof Component>
const { name, slug, profilePictureUrl } = getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')

export const Tile: Story = {
  args: {
    slug,
    name,
    pictureUrl: profilePictureUrl,
    size: SIZE_LG,
    swapsCount: 2
  }
}
