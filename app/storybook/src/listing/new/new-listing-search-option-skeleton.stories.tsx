// noinspection JSUnusedGlobalSymbols

import { NewListingSearchCollectionOptionSkeleton as Component } from '@echo/ui/components/listing/new/skeleton/new-listing-search-collection-option-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Search Collection Option',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
