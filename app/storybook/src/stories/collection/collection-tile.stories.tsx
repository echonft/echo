import { CollectionTile as Component } from '@echo/ui/components/collection/tile/collection-tile'
import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import { getCollectionById } from '@mocks/model/collection'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/Tile',
  component: Component,
  argTypes: {
    size: {
      options: [SizeMD, SizeLG],
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
const { name, slug, profilePictureUrl } = getCollectionById('Rc8pLQXxgyQGIRL0fr13')

export const Tile: Story = {
  args: {
    slug,
    name,
    pictureUrl: profilePictureUrl.href,
    size: SizeLG,
    swapsCount: 2
  }
}
