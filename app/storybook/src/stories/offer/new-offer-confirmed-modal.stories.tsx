import { NewOfferConfirmedModal as Component } from '@echo/ui/components/offer/new/new-offer-confirmed-modal'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New Offer Confirmed Modal',
  component: Component,
  argTypes: {
    onClose: {
      control: false,
      action: 'close'
    }
  },
  parameters: {
    controls: {
      exclude: ['show', 'onClose']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const NewOfferConfirmedModal: Story = {
  args: {
    show: true
  }
}
