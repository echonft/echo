// noinspection JSUnusedGlobalSymbols

import { ListingState } from '@echo/model/constants/listing-state'
import { listingMock } from '@echo/model/mocks/listing-mock'
import type { Listing } from '@echo/model/types/listing'
import type { NftItem } from '@echo/model/types/nft-item'
import { ListingCard } from '@echo/ui/components/listing/card/listing-card'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, head, modify, type NonEmptyArray, pipe, unless, values } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

type ComponentType = FunctionComponent<{
  state: ListingState
  stack: boolean
  scaleDisabled: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Listing/Card',
  args: {
    state: ListingState.Open,
    stack: false,
    scaleDisabled: false
  },
  argTypes: {
    state: {
      options: values(ListingState),
      control: { type: 'select' }
    },
    stack: {
      control: 'boolean'
    },
    scaleDisabled: {
      control: 'boolean'
    }
  }
}
export default metadata
export const Default: StoryObj<ComponentType> = {
  render: ({ state, stack, scaleDisabled }) => {
    const listing: Listing = useMemo(
      () =>
        pipe<[Listing], Listing, Listing>(
          assoc('state', state),
          unless<Listing, Listing>(
            always(stack),
            modify<'items', NonEmptyArray<NftItem>, NonEmptyArray<NftItem>>('items', head)
          )
        )(listingMock),
      [state, stack]
    )
    return <ListingCard listing={listing} options={{ scaleDisabled }} />
  }
}
