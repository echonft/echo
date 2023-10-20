import { OfferDetailsAcceptModalRow as Component } from '@echo/ui/components/offer/details/action/offer-details-accept-modal-row'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Accept Modal/Row',
  component: Component,
  argTypes: {
    status: {
      defaultValue: 'loading',
      options: ['loading', 'success', 'error'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Loading: Story = {
  args: {
    status: 'loading',
    title: 'You own all the assets'
  }
}

export const Success: Story = {
  args: {
    status: 'success',
    title: 'You own all the assets'
  }
}

export const Error: Story = {
  args: {
    status: 'error',
    title: 'You own all the assets'
  }
}
