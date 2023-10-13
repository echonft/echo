import { OFFER_STATES } from '@echo/model/constants/offer-states'
import { OfferDetailsState as Component } from '@echo/ui/components/offer/details/offer-details-state'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/State',
  component: Component,
  argTypes: {
    state: {
      defaultValue: 'OPEN',
      options: OFFER_STATES,
      control: { type: 'radio' }
    },
    expiresAt: {
      defaultValue: dayjs().add(1, 'd').unix(),
      options: {
        '1 year ago': dayjs().subtract(1, 'year').unix(),
        '1 month ago': dayjs().subtract(1, 'month').unix(),
        '1 week ago': dayjs().subtract(1, 'week').unix(),
        'in 1 minute': dayjs().add(1, 'minute').unix(),
        'in 1 hour': dayjs().add(1, 'hour').unix(),
        'in 3 days': dayjs().add(3, 'days').unix()
      },
      control: { type: 'radio' }
    },
    expired: {
      control: 'boolean'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const expiresAt = dayjs().add(1, 'd').unix()

export const Default: Story = {
  args: {
    state: 'OPEN',
    expiresAt
  }
}
