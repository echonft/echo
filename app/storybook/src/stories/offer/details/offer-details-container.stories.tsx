import { OfferDetailsContainer as Component, offers, OfferState } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Container',
  component: Component,
  parameters: {
    controls: {
      exclude: ['offer']
    }
  }
}

export default metadata

const mockOffer = offers['LyCfl6Eg7JKuD7XJ6IPi']!
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    offer: mockOffer
  }
}

export const Rejected: Story = {
  args: {
    offer: { ...mockOffer, state: OfferState.REJECTED }
  }
}

export const Accepted: Story = {
  args: {
    offer: { ...mockOffer, state: OfferState.ACCEPTED }
  }
}
