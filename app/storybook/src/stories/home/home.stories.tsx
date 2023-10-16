import type { Collection } from '@echo/model/types/collection'
import { Home as Component } from '@echo/ui/components/home/home'
import { getAllCollections } from '@mocks/model/collection'
import { getAllOffers } from '@mocks/model/offer'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, concat, map, pipe } from 'ramda'

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
const collectionDetails = map(pipe(assoc('swapsCount', 2)), getAllCollections()) as Collection[]
const collections = pipe(
  concat(collectionDetails),
  concat(collectionDetails),
  concat(collectionDetails),
  concat(collectionDetails)
)(collectionDetails)
const offerMocks = getAllOffers()
const offers = pipe(concat(offerMocks), concat(offerMocks))(offerMocks)

export const Default: Story = {
  args: {
    collections,
    offers
  }
}
