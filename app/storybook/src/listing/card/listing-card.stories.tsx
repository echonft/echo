// noinspection JSUnusedGlobalSymbols

import { LISTING_STATE_OPEN, LISTING_STATES } from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { ListingState } from '@echo/model/types/listing-state'
import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { ListingCard } from '@echo/ui/components/listing/card/listing-card'
import { type Meta, type StoryObj } from '@storybook/react'
import { always, assoc, drop, modify, pipe, unless } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

type ComponentType = FunctionComponent<{
  state: ListingState
  stack: boolean
  scaleDisabled: boolean
}>

const DEFAULT_STATE = LISTING_STATE_OPEN
const DEFAULT_STACK = false
const DEFAULT_SCALE_DISABLED = false

const metadata: Meta<ComponentType> = {
  title: 'Listing/Card',
  argTypes: {
    state: {
      defaultValue: DEFAULT_STATE,
      options: LISTING_STATES,
      control: { type: 'radio' }
    },
    stack: {
      defaultValue: DEFAULT_STACK,
      control: 'boolean'
    },
    scaleDisabled: {
      defaultValue: DEFAULT_SCALE_DISABLED,
      control: 'boolean'
    }
  },
  args: {
    state: DEFAULT_STATE,
    stack: DEFAULT_STACK,
    scaleDisabled: DEFAULT_SCALE_DISABLED
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
          unless<Listing, Listing>(always(stack), modify<'items', ListingItem[], ListingItem[]>('items', drop(1)))
        )(),
      [state, stack]
    )
    return <ListingCard listing={listing} options={{ scaleDisabled }} />
  }
}
