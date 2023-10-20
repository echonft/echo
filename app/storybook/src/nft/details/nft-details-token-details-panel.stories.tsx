import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NftDetailsTokenDetailsPanel as Component } from '@echo/ui/components/nft/details/nft-details-token-details-panel'
import { type Meta, type StoryObj } from '@storybook/react'

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
const {
  collection: {
    contract: { chainId }
  },
  tokenType,
  tokenId
} = getNftMockById('QFjMRNChUAHNswkRADXh')
export const Default: Story = {
  args: {
    chainId,
    tokenId,
    tokenType
  }
}
