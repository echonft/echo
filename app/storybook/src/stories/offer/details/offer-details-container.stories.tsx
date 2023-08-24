import { getOfferById } from '../../../mocks/model/offer'
import { OfferDetailsContainer as Component } from '@echo/ui'
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

const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')!
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    offer
  }
}

export const Rejected: Story = {
  args: {
    offer: { ...offer, state: 'INVALID' }
  }
}

export const Accepted: Story = {
  args: {
    offer: { ...offer, state: 'ACCEPTED' }
  }
}
