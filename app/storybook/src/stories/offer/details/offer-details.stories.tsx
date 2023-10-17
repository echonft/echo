import { OfferDetails as Component } from '@echo/ui/components/offer/details/offer-details'
import { getOfferById } from '@mocks/model/offer'
import type { Meta, StoryObj } from '@storybook/react'

const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Container',
  component: Component,
  argTypes: {
    isCreator: {
      control: 'boolean'
    }
  },
  parameters: {
    controls: {
      exclude: ['offer', 'token']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Open: Story = {
  args: {
    offer: offer,
    isCreator: true
  }
}

export const Rejected: Story = {
  args: {
    offer: { ...offer, state: 'REJECTED' },
    isCreator: true
  }
}
export const Cancelled: Story = {
  args: {
    offer: { ...offer, state: 'CANCELLED' },
    isCreator: true
  }
}
export const Completed: Story = {
  args: {
    offer: { ...offer, state: 'COMPLETED' },
    isCreator: true
  }
}
export const Accepted: Story = {
  args: {
    offer: { ...offer, state: 'ACCEPTED' },
    isCreator: true
  }
}
