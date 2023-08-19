import { OfferComponent as Component, offers, OfferSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Row',
  component: Component,
  argTypes: {
    isReceiver: {
      control: 'boolean',
      defaultValue: false
    }
  },
  parameters: {
    controls: {
      exclude: ['receiver', 'offer']
    }
  }
}

export default metadata

const mockOffer = offers['LyCfl6Eg7JKuD7XJ6IPi']!
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    offer: mockOffer
  }
}

export const Skeleton: Story = {
  render: () => <OfferSkeleton />
}
