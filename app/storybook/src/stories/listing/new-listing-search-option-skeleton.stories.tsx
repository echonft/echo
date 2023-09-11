import { NewListingSearchCollectionOptionSkeleton as Component } from '@echo/ui/src/components/listing/new/skeleton/new-listing-search-collection-option-skeleton'
import { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New Listing Search Collection Option',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
