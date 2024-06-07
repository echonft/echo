// noinspection JSUnusedGlobalSymbols

import { getNftMock } from '@echo/model/mocks/nft/get-nft-mock'
import { SelectableNftThumbnail as Component } from '@echo/ui/components/nft/selectable-thumbnail/selectable-nft-thumbnail'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'NFT/Selectable Thumbnail',
  component: Component,
  args: {
    nft: getNftMock()
  },
  argTypes: {
    onRemove: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: 'nft'
    }
  }
}

export default metadata

export const SelectableThumbnail: StoryObj<typeof Component> = {}
