import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NftDetailsHeader as Component } from '@echo/ui/components/nft/details/nft-details-header'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Details/Header',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collectionName', 'tokenId', 'owner']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const { collection, tokenId, owner, openSeaUrl, blurUrl } = getNftMockById('5SeF1NSN5uPUxtWSr516')
export const Default: Story = {
  args: {
    collectionName: collection.name,
    tokenId,
    owner,
    openSeaUrl,
    blurUrl
  }
}
