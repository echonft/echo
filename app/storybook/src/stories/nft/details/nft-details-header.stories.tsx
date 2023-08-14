import { nftCollections, NftDetailsHeader as Component, NftDetailsHeaderSkeleton, nfts } from '@echo/ui'
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

export const Default: Story = {
  args: {
    collectionName: nftCollections['Rc8pLQXxgyQGIRL0fr13']!.name,
    tokenId: nfts['QFjMRNChUAHNswkRADXh']!.tokenId,
    owner: nfts['QFjMRNChUAHNswkRADXh']!.owner,
    openSeaUrl: new URL('https://opensea.io'),
    blurUrl: new URL('https://blur.io')
  }
}

export const Skeleton: Story = {
  render: () => <NftDetailsHeaderSkeleton />
}
