// noinspection JSUnusedGlobalSymbols

import { OfferDetailsSkeleton as Component } from '@echo/ui/components/offer/details/skeleton/offer-details-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details',
  component: Component
}

export default metadata

export const Skeleton: StoryObj<typeof Component> = {}
