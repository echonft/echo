import { contracts, nfts } from '@echo/model'
import { NftDetailsTokenDetailsPanel as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Nft/Details/Details Panel',
  component: Component,
  parameters: {
    controls: {
      exclude: ['chainId', 'tokenId', 'tokenType']
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const DetailsPanel: Story = {
  args: {
    chainId: contracts['37dBlwJYahEAKeL0rNP8']!.chainId,
    tokenId: nfts['QFjMRNChUAHNswkRADXh']!.tokenId,
    tokenType: contracts['37dBlwJYahEAKeL0rNP8']!.tokenType
  }
}
