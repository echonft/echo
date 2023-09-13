import { getNftById } from '../../../mocks/model/nft'
import { NftDetailsTokenDetailsPanel as Component } from '@echo/ui/components/nft/details/nft-details-token-details-panel'
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
const {
  collection: {
    contract: { chainId, tokenType }
  },
  tokenId
} = getNftById('QFjMRNChUAHNswkRADXh')
export const Default: Story = {
  args: {
    chainId,
    tokenId,
    tokenType
  }
}
