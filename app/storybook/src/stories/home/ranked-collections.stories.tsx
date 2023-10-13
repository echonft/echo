import { RankedCollections as Component } from '@echo/ui/components/home/collection/ranked/ranked-collections'
import type { CollectionTileDetails } from '@echo/ui/types/collection-tile-details'
import { getAllCollections } from '@mocks/model/collection'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, concat, map, pick, pipe } from 'ramda'

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
const collections = map(
  pipe(pick(['slug', 'name', 'profilePictureUrl']), assoc('swapsCount', 2)),
  getAllCollections()
) as CollectionTileDetails[]

export const Default: Story = {
  args: {
    collections: concat(collections, collections)
  }
}
