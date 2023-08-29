import { getNftById } from '../../../mocks/model/nft'
import { getCollectionById } from '../../../mocks/model/nft-collection'
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
const collection = getCollectionById(nft.collectionId)
export const Default: Story = {
  args: {
    chainId: collection.contract.chainId,
    tokenId: nft.tokenId,
    tokenType: collection.contract.tokenType
  }
}

export const Skeleton: Story = {
  render: () => <NftDetailsTokenDetailsPanelSkeleton />
}
