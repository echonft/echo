import { getOfferById } from '../../../mocks/model/offer'
import { OfferDetails as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Container',
  component: Component,
  args: {
    renderModal: false
  },
  argTypes: {
    isReceiver: {
      control: { type: 'radio' }
    },
    // TODO Use exclude if possible
    renderModal: {
      table: {
        disable: true
      }
    },
    offer: {
      table: {
        disable: true
      }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Open: Story = {
  args: {
    offer: offer,
    isReceiver: false
  }
}

export const Rejected: Story = {
  args: {
    offer: { ...offer, state: 'REJECTED' },
    isReceiver: false
  }
}
export const Cancelled: Story = {
  args: {
    offer: { ...offer, state: 'CANCELLED' },
    isReceiver: false
  }
}

export const Invalid: Story = {
  args: {
    offer: { ...offer, state: 'INVALID' },
    isReceiver: false
  }
}

export const Completed: Story = {
  args: {
    offer: { ...offer, state: 'COMPLETED' },
    isReceiver: false
  }
}
export const Accepted: Story = {
  args: {
    offer: { ...offer, state: 'ACCEPTED' },
    isReceiver: false
  }
}
