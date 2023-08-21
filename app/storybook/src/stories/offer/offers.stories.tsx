import { offers, OffersProvided as Component, OfferState, UserOffersSkeleton, users } from '@echo/ui'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/User Offers',
  component: Component,
  parameters: {
    controls: {
      exclude: ['user', 'offers']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
export const Fetched: Story = {
  args: {
    user: users['oE6yUEQBPn7PZ89yMjKn']!,
    offers: [
      offers['LyCfl6Eg7JKuD7XJ6IPi']!,
      { ...offers['LyCfl6Eg7JKuD7XJ6IPi']!, state: OfferState.ACCEPTED },
      { ...offers['LyCfl6Eg7JKuD7XJ6IPi']!, state: OfferState.CANCELLED },
      { ...offers['LyCfl6Eg7JKuD7XJ6IPi']!, state: OfferState.EXPIRED },
      { ...offers['LyCfl6Eg7JKuD7XJ6IPi']!, state: OfferState.COMPLETED },
      { ...offers['LyCfl6Eg7JKuD7XJ6IPi']!, state: OfferState.REJECTED }
    ]
  }
}

export const Fetching: Story = {
  render: () => <UserOffersSkeleton />
}
