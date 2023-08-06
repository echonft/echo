import { contracts, nfts } from '@echo/model'
import { NftDetailsTokenDetailsPanel as Component, NftDetailsTokenDetailsPanelSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Details/Details Panel',
  component: Component,
  parameters: {
    controls: {
      exclude: ['chainId', 'tokenId', 'tokenType']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    chainId: contracts['37dBlwJYahEAKeL0rNP8']!.chainId,
    tokenId: nfts['QFjMRNChUAHNswkRADXh']!.tokenId,
    tokenType: contracts['37dBlwJYahEAKeL0rNP8']!.tokenType
  }
}

export const Skeleton: Story = {
  render: () => <NftDetailsTokenDetailsPanelSkeleton />
}
