import { OfferDetailsStateSkeleton as Component } from '@echo/ui/components/offer/details/skeleton/offer-details-state-skeleton'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/State',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
