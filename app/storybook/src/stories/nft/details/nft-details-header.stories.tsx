import { NftDetailsHeader as Component } from '@echo/ui/components/nft/details/nft-details-header'
import { getNftById } from '@mocks/model/nft'
import type { Meta, StoryObj } from '@storybook/react'

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
const { collection, tokenId, owner, openSeaUrl, blurUrl } = getNftById('5SeF1NSN5uPUxtWSr516')
export const Default: Story = {
  args: {
    collectionName: collection.name,
    tokenId,
    owner,
    openSeaUrl,
    blurUrl
  }
}
