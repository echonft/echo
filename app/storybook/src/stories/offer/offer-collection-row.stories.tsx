import { getOfferById } from '../../mocks/model/offer'
import { OfferCollectionRow as Component, OfferCollectionRowSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')!

const metadata: Meta<typeof Component> = {
  title: 'Offer/Collection Row',
  component: Component,
  parameters: {
    controls: {
      exclude: ['offer']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    offer
  }
}

export const Skeleton: Story = {
  render: () => <OfferCollectionRowSkeleton />
}
