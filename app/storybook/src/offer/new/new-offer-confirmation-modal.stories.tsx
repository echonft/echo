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
    onConfirm: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['receiverItems', 'senderItems', 'open', 'confirming']
    }
  }
}

export default metadata

const { senderItems, receiverItems } = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    senderItems,
    receiverItems,
    open: true
  }
}

export const MultipleAssets: Story = {
  args: {
    senderItems: senderItems.concat(receiverItems),
    receiverItems: receiverItems.concat(senderItems),
    open: true
  }
}

export const Confirming: Story = {
  args: {
    senderItems,
    receiverItems,
    open: true,
    confirming: true
  }
}
