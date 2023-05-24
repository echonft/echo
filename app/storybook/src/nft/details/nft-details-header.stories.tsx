import { nftCollections, nfts } from '@echo/model'
import { NftDetailsHeader as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Nft/Details/Header',
  component: Component,
  parameters: {
    controls: {
      exclude: ['collectionName', 'tokenId', 'owner']
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Header: Story = {
  args: {
    collectionName: nftCollections['Rc8pLQXxgyQGIRL0fr13']!.name,
    tokenId: nfts['QFjMRNChUAHNswkRADXh']!.tokenId,
    owner: nfts['QFjMRNChUAHNswkRADXh']!.owner
  }
}
