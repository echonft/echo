import { NftDetailsSkeleton as Component } from '@echo/ui/components/nft/details/skeleton/nft-details-skeleton'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/NFT Details',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
