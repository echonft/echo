import { OfferDetailsSkeleton as Component } from '@echo/ui/src/components/offer/details/skeleton/offer-details-skeleton'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Container',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Fetching: Story = {}
