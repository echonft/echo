import { OFFER_STATES } from '@echo/model/constants/offer-states'
import { OfferRowStatePill as Component } from '@echo/ui/components/offer/row/offer-row-state-pill'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Row/State',
  component: Component,
  argTypes: {
    state: {
      options: OFFER_STATES,
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    state: 'OPEN',
    expired: false
  }
}

export const Expired: Story = {
  args: {
    state: 'OPEN',
    expired: true
  }
}
