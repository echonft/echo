// noinspection JSUnusedGlobalSymbols

import { ListingCardSkeleton as Component } from '@echo/ui/components/listing/card/skeleton/listing-card-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Card',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
