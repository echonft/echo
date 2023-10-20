import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { CollectionTile as Component } from '@echo/ui/components/collection/tile/collection-tile'
import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import { type Meta, type StoryObj } from '@storybook/react'

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
const { name, slug, profilePictureUrl } = getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')

export const Tile: Story = {
  args: {
    slug,
    name,
    pictureUrl: profilePictureUrl,
    size: SizeLG,
    swapsCount: 2
  }
}
