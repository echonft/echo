import { NewOfferConfirmationModal as Component } from '@echo/ui/components/offer/new/new-offer-confirmation-modal'
import { getOfferById } from '@mocks/model/offer'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New/Confirmation Modal',
  component: Component,
  argTypes: {
    onClose: {
      control: false,
      action: 'close'
    },
    onConfirm: {
      control: false,
      action: 'confirm'
    }
  },
  parameters: {
    controls: {
      exclude: ['show', 'confirming', 'onClose', 'onConfirm']
    }
  }
}

export default metadata

const { senderItems, receiverItems } = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    senderItems,
    receiverItems,
    show: true
  }
}

export const MultipleAssets: Story = {
  args: {
    senderItems: senderItems.concat(receiverItems),
    receiverItems: receiverItems.concat(senderItems),
    show: true
  }
}

export const Confirming: Story = {
  args: {
    senderItems,
    receiverItems,
    show: true,
    confirming: true
  }
}
