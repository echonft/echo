import { HomeCollections as Component } from '@echo/ui/components/home/collection/home-collections'
import type { CollectionTileDetails } from '@echo/ui/types/collection-tile-details'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { getAllCollections } from '@mocks/model/collection'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, concat, map, pick, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Home/Collections',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collections']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const collectionDetails = map(
  pipe(pick(['slug', 'name', 'profilePictureUrl']), assoc('swapsCount', 2)),
  getAllCollections()
) as CollectionTileDetails[]
const collections = pipe(
  concat(collectionDetails),
  concat(collectionDetails),
  concat(collectionDetails),
  concat(collectionDetails)
)(collectionDetails) as NonEmptyArray<CollectionTileDetails>

export const Default: Story = {
  args: {
    collections
  }
}
