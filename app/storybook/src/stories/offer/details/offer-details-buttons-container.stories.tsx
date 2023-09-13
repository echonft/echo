import { OfferDetailsButtonsContainer as Component } from '@echo/ui/components/offer/details/offer-details-buttons-container'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Buttons Container',
  component: Component,
  argTypes: {
    state: {
      defaultValue: 'OPEN',
      // TODO Add other states
      options: ['OPEN', 'ACCEPTED'],
      control: { type: 'radio' }
    },
    nftsCount: {
      defaultValue: 1,
      options: {
        Single: 1,
        Multiple: 2
      },
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    state: 'OPEN',
    nftsCount: 1,
    isUpdating: false
  }
}
