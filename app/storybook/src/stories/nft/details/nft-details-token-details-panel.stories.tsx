import { getNftById } from '../../../mocks/model/nft'
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
const nft = getNftById('QFjMRNChUAHNswkRADXh')
export const Default: Story = {
  args: {
    chainId: nft.collection.contract.chainId,
    tokenId: nft.tokenId,
    tokenType: nft.collection.contract.tokenType
  }
}

export const Skeleton: Story = {
  render: () => <NftDetailsTokenDetailsPanelSkeleton />
}
