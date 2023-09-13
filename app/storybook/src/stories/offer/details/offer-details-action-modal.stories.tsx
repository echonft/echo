import { OfferDetailsActionModal as Component } from '@echo/ui/components/offer/details/offer-details-action-modal'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Action Modal',
  component: Component,
  argTypes: {
    offerState: {
      defaultValue: 'ACCEPTED',
      options: ['ACCEPTED', 'CANCELLED', 'REJECTED'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    offerState: 'ACCEPTED'
  }
}
