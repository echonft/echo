import { getOfferById } from '../../mocks/model/offer'
import { OfferRow as Component, OfferSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')!

const metadata: Meta<typeof Component> = {
  title: 'Offer/Row',
  component: Component,
  argTypes: {
    isReceiver: {
      control: 'boolean',
      defaultValue: false
    },
    offer: {
      defaultValue: offer,
      options: {
        Open: offer,
        Accepted: { ...offer, state: 'ACCEPTED' },
        Cancelled: { ...offer, state: 'CANCELLED' },
        Rejected: { ...offer, state: 'REJECTED' },
        Invalid: { ...offer, state: 'INVALID' }
      },
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    offer,
    isReceiver: true
  }
}

export const Skeleton: Story = {
  render: () => <OfferSkeleton />
}
