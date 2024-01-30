// noinspection JSUnusedGlobalSymbols

import { OFFER_STATE_EXPIRED, OFFER_STATE_OPEN, OFFER_STATES } from '@echo/model/constants/offer-states'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { OfferDetailsState as Component } from '@echo/ui/components/offer/details/offer-details-state'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/State',
  component: Component,
  args: {
    state: OFFER_STATE_OPEN,
    expiresAt: notExpiredDate()
  },
  argTypes: {
    state: {
      defaultValue: OFFER_STATE_OPEN,
      options: OFFER_STATES,
      control: { type: 'select' }
    }
  },
  parameters: {
    controls: {
      exclude: 'expiresAt'
    }
  }
}

export default metadata

export const State: StoryObj<typeof Component> = {
  render: ({ state }) => (
    <Component state={state} expiresAt={state === OFFER_STATE_EXPIRED ? expiredDate() : notExpiredDate()} />
  )
}
