import { getNftMock } from '@echo/model-mocks/nft/get-nft-mock'
import { NftThumbnail as Component } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { type Meta, type StoryObj } from '@storybook/react'

const DEFAULT_REMOVABLE = false
const metadata: Meta<typeof Component> = {
  title: 'NFT/Thumbnail',
  component: Component,
  argTypes: {
    removable: {
      defaultValue: DEFAULT_REMOVABLE,
      control: 'boolean'
    },
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

type Story = StoryObj<typeof Component>

const nft = getNftMock()
export const Thumbnail: Story = {
  args: {
    nft,
    removable: DEFAULT_REMOVABLE
  }
}
