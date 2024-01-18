// noinspection JSUnusedGlobalSymbols

import { OfferRowStatePillSkeleton as Component } from '@echo/ui/components/offer/row/skeleton/offer-row-state-pill-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Row/State',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
