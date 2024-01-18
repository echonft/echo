// noinspection JSUnusedGlobalSymbols

import { OFFER_STATE_OPEN, OFFER_STATES } from '@echo/model/constants/offer-states'
import type { OfferState } from '@echo/model/types/offer-state'
import { OfferDetailsState as Component } from '@echo/ui/components/offer/details/offer-details-state'
import { type Meta, type StoryObj } from '@storybook/react'
import dayjs from 'dayjs'

const DEFAULT_STATE: OfferState = OFFER_STATE_OPEN
const DEFAULT_EXPIRED = false
const EXPIRED_DATE = dayjs().subtract(2, 'd').unix()
const NOT_EXPIRED_DATE = dayjs().add(2, 'd').unix()
const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/State',
  component: Component,
  argTypes: {
    state: {
      defaultValue: DEFAULT_STATE,
      options: OFFER_STATES,
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

export const Default: Story = {
  render: ({ state, expired }) => (
    <Component state={state} expired={expired} expiresAt={expired ? EXPIRED_DATE : NOT_EXPIRED_DATE} />
  ),
  args: {
    state: DEFAULT_STATE,
    expired: DEFAULT_EXPIRED,
    expiresAt: NOT_EXPIRED_DATE
  }
}
