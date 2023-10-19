import { OfferDetailsButtonsContainer as Component } from '@echo/ui/components/offer/details/offer-details-buttons-container'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Buttons Container',
  component: Component,
  argTypes: {
    state: {
      defaultValue: 'OPEN',
      options: ['OPEN', 'ACCEPTED', 'CANCELLED', 'REJECTED', 'INVALID', 'COMPLETED'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    state: 'OPEN',
    isUpdating: false
  }
}
