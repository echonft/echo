import { NftDetailsHeaderSkeleton as Component } from '@echo/ui/components/nft/details/skeleton/nft-details-header-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Details/Header',
  component: Component
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
