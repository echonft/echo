import { OfferDetailsState as Component, OfferState } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(RelativeTime)

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/State',
  component: Component,
  argTypes: {
    state: {
      defaultValue: OfferState.OPEN,
      options: Object.values(OfferState),
      control: { type: 'radio' }
    },
    expiresAt: {
      defaultValue: dayjs().add(1, 'd'),
      options: {
        '1 year ago': dayjs().subtract(1, 'year'),
        '1 month ago': dayjs().subtract(1, 'month'),
        '1 week ago': dayjs().subtract(1, 'week'),
        'in 1 minute': dayjs().add(1, 'minute'),
        'in 1 hour': dayjs().add(1, 'hour'),
        'in 3 days': dayjs().add(3, 'days')
      },
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    state: OfferState.OPEN,
    expiresAt: dayjs().add(1, 'd')
  }
}
