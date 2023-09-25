import { HomeHero as Component } from '@echo/ui/components/home/hero/home-hero'
import type { CollectionTileDetails } from '@echo/ui/types/model/collection-tile-details'
import { getCollectionById } from '@mocks/model/collection'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, pick, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Home/Hero',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collection']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const collection = pipe(
  getCollectionById,
  pick(['slug', 'name', 'profilePictureUrl']),
  assoc('swapsCount', 2)
)('Rc8pLQXxgyQGIRL0fr13') as CollectionTileDetails

export const Default: Story = {
  args: {
    collection
  }
}
