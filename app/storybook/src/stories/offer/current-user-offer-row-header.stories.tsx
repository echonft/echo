import { CurrentUserOfferRowHeader as Component } from '@echo/ui/src/components/offer/row/current-user-offer-row-header'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Current User/Row Header',
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
    discordUsername: 'johnnycagewins',
    expired: false
  }
}

export const Expired: Story = {
  args: {
    state: 'OPEN',
    discordUsername: 'johnnycagewins',
    expired: true
  }
}
