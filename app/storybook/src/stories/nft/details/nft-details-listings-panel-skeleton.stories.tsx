import { NftDetailsListingsPanelSkeleton as Component } from '@echo/ui/components/nft/details/skeleton/nft-details-listings-panel-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Details/Listings Panel',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
