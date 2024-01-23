// noinspection JSUnusedGlobalSymbols

import { LISTING_STATE_EXPIRED, LISTING_STATE_OPEN, LISTING_STATES } from '@echo/model/constants/listing-states'
import type { ListingState } from '@echo/model/types/listing-state'
import { ListingDetailsState as Component } from '@echo/ui/components/listing/details/listing-details-state'
import { type Meta, type StoryObj } from '@storybook/react'
import dayjs from 'dayjs'

const DEFAULT_STATE: ListingState = LISTING_STATE_OPEN
const EXPIRED_DATE = dayjs().subtract(2, 'd').unix()
const NOT_EXPIRED_DATE = dayjs().add(2, 'd').unix()
const metadata: Meta<typeof Component> = {
  title: 'Listing/Details/State',
  component: Component,
  argTypes: {
    state: {
      defaultValue: DEFAULT_STATE,
      options: LISTING_STATES,
      control: { type: 'radio' }
    }
  },
  parameters: {
    controls: {
      exclude: 'expiresAt'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const State: Story = {
  render: ({ state }) => (
    <Component state={state} expiresAt={state === LISTING_STATE_EXPIRED ? EXPIRED_DATE : NOT_EXPIRED_DATE} />
  ),
  args: {
    state: DEFAULT_STATE,
    expiresAt: NOT_EXPIRED_DATE
  }
}
