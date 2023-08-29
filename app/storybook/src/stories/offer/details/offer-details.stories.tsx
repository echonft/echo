import { getOfferById } from '../../../mocks/model/offer'
import { getUserById } from '../../../mocks/model/user'
import { OfferDetails as Component, OfferDetailsProvided, OfferDetailsSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')
const user = getUserById('oE6yUEQBPn7PZ89yMjKn')

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Container',
  component: Component,
  args: {
    renderModal: false
  },
  argTypes: {
    user: {
      options: ['receiver', 'sender'],
      mapping: {
        receiver: user,
        sender: getUserById('6rECUMhevHfxABZ1VNOm')
      },
      control: { type: 'radio' },
      name: 'isReceiver'
    },
    renderModal: {
      table: {
        disable: true
      }
    },
    offerId: {
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

export const Managed: Story = {
  args: {
    offerId: 'LyCfl6Eg7JKuD7XJ6IPi',
    user
  }
}
export const Open: Story = {
  render: () => {
    return <OfferDetailsProvided offer={offer} isReceiving={false} />
  }
}

export const Rejected: Story = {
  render: () => {
    return <OfferDetailsProvided offer={{ ...offer, state: 'REJECTED' }} isReceiving={false} />
  }
}
export const Cancelled: Story = {
  render: () => {
    return <OfferDetailsProvided offer={{ ...offer, state: 'CANCELLED' }} isReceiving={false} />
  }
}

export const Invalid: Story = {
  render: () => {
    return <OfferDetailsProvided offer={{ ...offer, state: 'INVALID' }} isReceiving={false} />
  }
}

export const Completed: Story = {
  render: () => {
    return <OfferDetailsProvided offer={{ ...offer, state: 'COMPLETED' }} isReceiving={false} />
  }
}
export const Accepted: Story = {
  render: () => {
    return <OfferDetailsProvided offer={{ ...offer, state: 'ACCEPTED' }} isReceiving={false} />
  }
}

export const Skeleton: Story = {
  argTypes: {
    user: {
      table: {
        disable: true
      }
    }
  },
  render: () => <OfferDetailsSkeleton />
}
