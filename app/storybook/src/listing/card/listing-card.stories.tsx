// noinspection JSUnusedGlobalSymbols

import { LISTING_STATE_OPEN, LISTING_STATES } from '@echo/model/constants/listing-states'
import { getListingMock } from '@echo/model/mocks/listing/get-listing-mock'
import type { Item, Items } from '@echo/model/types/item'
import type { Listing } from '@echo/model/types/listing'
import type { ListingState } from '@echo/model/types/listing-state'
import type { Erc721Token } from '@echo/model/types/token'
import { ListingCard } from '@echo/ui/components/listing/card/listing-card'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, drop, modify, pipe, unless } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

type ComponentType = FunctionComponent<{
  state: ListingState
  stack: boolean
  scaleDisabled: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Listing/Card',
  args: {
    state: LISTING_STATE_OPEN,
    stack: false,
    scaleDisabled: false
  },
  argTypes: {
    state: {
      defaultValue: LISTING_STATE_OPEN,
      options: LISTING_STATES,
      control: { type: 'select' }
    },
    stack: {
      defaultValue: false,
      control: 'boolean'
    },
    scaleDisabled: {
      defaultValue: false,
      control: 'boolean'
    }
  }
}
export default metadata
export const Default: StoryObj<ComponentType> = {
  render: ({ state, stack, scaleDisabled }) => {
    const listing: Listing = useMemo(
      () =>
        pipe<never[], Listing, Listing, Listing>(
          getListingMock,
          assoc('state', state),
          unless<Listing, Listing>(
            always(stack),
            modify<'items', Items, Items>(
              'items',
              modify<'erc721', Item<Erc721Token>[], Item<Erc721Token>[]>('erc721', drop(1))
            )
          )
        )(),
      [state, stack]
    )
    return <ListingCard listing={listing} options={{ scaleDisabled }} />
  }
}
