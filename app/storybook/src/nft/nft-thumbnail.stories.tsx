// noinspection JSUnusedGlobalSymbols

import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import { NftThumbnail as Component } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Thumbnail',
  component: Component,
  args: {
    nft: nftMockSpiral1
  },
  parameters: {
    controls: {
      exclude: 'nft'
    }
  }
}

export default metadata

export const Thumbnail: StoryObj<typeof Component> = {}
