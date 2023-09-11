import { NftDetailsTokenDetailsPanelSkeleton as Component } from '@echo/ui/src/components/nft/details/skeleton/nft-details-token-details-panel-skeleton'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Details/Details Panel',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
