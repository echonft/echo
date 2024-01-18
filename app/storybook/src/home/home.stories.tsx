// noinspection JSUnusedGlobalSymbols

import { type Collection } from '@echo/model/types/collection'
import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { getAllOfferMocks } from '@echo/model-mocks/offer/get-all-offer-mocks'
import { Home as Component } from '@echo/ui/components/home/home'
import { type Meta, type StoryObj } from '@storybook/react'
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
const collectionDetails = map(pipe(assoc('swapsCount', 2)), getAllCollectionMocks()) as Collection[]
const collections = pipe(
  concat(collectionDetails),
  concat(collectionDetails),
  concat(collectionDetails),
  concat(collectionDetails)
)(collectionDetails)
const offerMocks = getAllOfferMocks()
const offers = pipe(concat(offerMocks), concat(offerMocks))(offerMocks)

export const Default: Story = {
  args: {
    collections,
    offers
  }
}
