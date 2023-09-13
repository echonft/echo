import { OfferStatePillSkeleton as Component } from '@echo/ui/components/offer/row/skeleton/offer-state-pill-skeleton'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/State',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
