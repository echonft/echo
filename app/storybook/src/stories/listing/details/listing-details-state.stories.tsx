import { LISTING_STATES } from '@echo/model/constants/listing-states'
import type { ListingState } from '@echo/model/types/listing-state'
import { ListingDetailsState as Component } from '@echo/ui/components/listing/details/listing-details-state'
import { type Meta, type StoryObj } from '@storybook/react'
import dayjs from 'dayjs'

const DEFAULT_STATE: ListingState = 'OPEN'
const DEFAULT_EXPIRED = false
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
    },
    expired: {
      defaultValue: DEFAULT_EXPIRED,
      control: 'boolean'
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
  render: ({ state, expired }) => (
    <Component state={state} expired={expired} expiresAt={expired ? EXPIRED_DATE : NOT_EXPIRED_DATE} />
  ),
  args: {
    state: DEFAULT_STATE,
    expired: DEFAULT_EXPIRED,
    expiresAt: NOT_EXPIRED_DATE
  }
}
