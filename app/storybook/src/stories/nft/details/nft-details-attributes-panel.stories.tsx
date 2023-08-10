import { nfts } from '@echo/model'
import { NftDetailsAttributesPanel as Component, NftDetailsAttributesPanelSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

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

export const Default: Story = {
  args: {
    attributes: nfts['QFjMRNChUAHNswkRADXh']!.attributes
  }
}

export const Skeleton: Story = {
  render: () => <NftDetailsAttributesPanelSkeleton />
}
