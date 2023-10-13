import { Home as Component } from '@echo/ui/components/home/home'
import type { CollectionTileDetails } from '@echo/ui/types/collection-tile-details'
import { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { getAllCollections } from '@mocks/model/collection'
import { getAllOffers } from '@mocks/model/offer'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, concat, map, pick, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Home',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collections', 'offers']
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
const offerMocks = getAllOffers()
const offers = pipe(concat(offerMocks), concat(offerMocks))(offerMocks)

export const Default: Story = {
  args: {
    collections,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    offers
  }
}
