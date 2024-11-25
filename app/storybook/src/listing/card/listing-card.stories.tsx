// noinspection JSUnusedGlobalSymbols

import { ListingState } from '@echo/model/constants/listing-state'
import { listingMock } from '@echo/model/mocks/listing-mock'
import type { NftItem } from '@echo/model/types/item'
import type { Listing } from '@echo/model/types/listing'
import { ListingCard } from '@echo/ui/components/listing/card/listing-card'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, modify, type NonEmptyArray, pipe, take, unless, values } from 'ramda'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  state: ListingState
  stack: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Listing/Card',
  args: {
    state: ListingState.Open,
    stack: false
  },
  argTypes: {
    state: {
      options: values(ListingState),
      control: { type: 'select' }
    },
    stack: {
      control: 'boolean'
    }
  }
}
export default metadata

export const Default: StoryObj<ComponentType> = {
  render: ({ state, stack }) => {
    const listing = pipe<[Listing], Listing, Listing>(
      assoc('state', state),
      unless<Listing, Listing>(
        always(stack),
        modify<'items', NonEmptyArray<NftItem>, NonEmptyArray<NftItem>>('items', take(1))
      )
    )(listingMock)
    return <ListingCard listing={listing} />
  }
}
