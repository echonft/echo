import { OfferInfoContainer as Component } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Info',
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
    state: 'OPEN',
    discordUsername: 'johnnycage#0890'
  }
}
