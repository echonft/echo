// noinspection JSUnusedGlobalSymbols

import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { NewOfferConfirmationModal as Component } from '@echo/ui/components/offer/new/new-offer-confirmation-modal'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New/Confirmation Modal',
  component: Component,
  argTypes: {
    onClose: {
      table: {
        disable: true
      }
    },
    onContinue: {
      table: {
        disable: true
      }
    },
    onComplete: {
      table: {
        disable: true
      }
    },
    onClear: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['receiverItems', 'receiver', 'senderItems', 'open']
    }
  }
}

export default metadata

const { receiverItems, receiver, senderItems } = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')

type Story = StoryObj<typeof Component>

export const ItemsNotSelected: Story = {
  args: {
    receiver,
    receiverItems,
    senderItems: undefined,
    open: true
  }
}

export const ItemsSelected: Story = {
  args: {
    receiver,
    receiverItems: [receiverItems[0]!, receiverItems[0]!],
    senderItems: [senderItems[0]!, senderItems[0]!, senderItems[0]!, senderItems[0]!],
    open: true
  }
}

export const Confirming: Story = {
  args: {
    receiver,
    receiverItems: [receiverItems[0]!, receiverItems[0]!],
    senderItems: [senderItems[0]!, senderItems[0]!, senderItems[0]!, senderItems[0]!],
    open: true,
    onClear: undefined,
    onContinue: undefined,
    onComplete: undefined,
    onClose: undefined
  }
}
