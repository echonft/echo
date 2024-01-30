// noinspection JSUnusedGlobalSymbols

import { ListingDetailsSkeleton as Component } from '@echo/ui/components/listing/details/skeleton/listing-details-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Details',
  component: Component
}

export default metadata

export const Fetching: StoryObj<typeof Component> = {}
