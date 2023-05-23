import { mockContract, mockOwnedNft } from '@echo/model'
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
    chainId: mockContract.chainId,
    tokenId: mockOwnedNft.tokenId,
    tokenType: mockContract.tokenType
  }
}
