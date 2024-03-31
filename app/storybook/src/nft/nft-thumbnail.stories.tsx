// noinspection JSUnusedGlobalSymbols

import { getNftMock } from '@echo/model-mocks/nft/get-nft-mock'
import { NftThumbnail as Component } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Thumbnail',
  component: Component,
  args: {
    nft: getNftMock()
  },
  parameters: {
    controls: {
      exclude: 'nft'
    }
  }
}

export default metadata

export const Thumbnail: StoryObj<typeof Component> = {}
