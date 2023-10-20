import { NftDetailsAttributesPanelSkeleton as Component } from '@echo/ui/components/nft/details/skeleton/nft-details-attributes-panel-skeleton'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Details/Attributes Panel',
  component: Component,
  parameters: {
    controls: {
      exclude: 'attributes'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Skeleton: Story = {}
