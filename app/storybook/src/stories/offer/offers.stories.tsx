import { getOfferById } from '../../mocks/model/offer'
import { getUserById } from '../../mocks/model/user'
import { OffersProvided as Component, UserOffers, UserOffersSkeleton } from '@echo/ui'
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

const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')
const user = getUserById('6rECUMhevHfxABZ1VNOm')

type Story = StoryObj<typeof Component>

export const Managed: Story = {
  render: () => <UserOffers user={user} />
}
export const Fetched: Story = {
  args: {
    user: getUserById('oE6yUEQBPn7PZ89yMjKn'),
    offers: [
      offer,
      { ...offer, state: 'ACCEPTED' },
      { ...offer, state: 'CANCELLED' },
      { ...offer, state: 'REJECTED' },
      { ...offer, state: 'INVALID' }
    ]
  }
}
export const Fetching: Story = {
  render: () => <UserOffersSkeleton />
}
