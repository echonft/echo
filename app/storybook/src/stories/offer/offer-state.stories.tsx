import { OfferStatePill as Component } from '@echo/ui/src/components/offer/row/offer-state-pill'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/State',
  component: Component,
  argTypes: {
    state: {
      options: ['OPEN', 'ACCEPTED', 'CANCELLED', 'REJECTED', 'INVALID'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    state: 'OPEN'
  }
}
