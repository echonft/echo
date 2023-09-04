import { UserOffersSkeleton as Component } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/User Offers',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Fetching: Story = {}
