import { OfferRowSkeleton as Component } from '@echo/ui/components/offer/row/skeleton/offer-row-skeleton'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Row',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
