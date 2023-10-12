import { OfferDetailsActionModal as Component } from '@echo/ui/components/offer/details/action-modal/offer-details-action-modal'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Action Modal',
  component: Component,
  argTypes: {
    action: {
      defaultValue: 'ACCEPT',
      options: ['ACCEPT', 'CANCEL', 'REJECT'],
      control: { type: 'radio' }
    },
    onClose: {
      control: false,
      action: 'closed'
    }
  },
  parameters: {
    controls: {
      exclude: ['open', 'onClose']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const ActionModal: Story = {
  args: {
    open: true,
    action: 'ACCEPT'
  }
}
