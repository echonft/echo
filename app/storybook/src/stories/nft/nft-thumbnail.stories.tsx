import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NftThumbnail as Component } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Thumbnail',
  component: Component,
  argTypes: {
    hideOwner: {
      defaultValue: false,
      control: 'boolean'
    }
  },
  parameters: {
    controls: {
      exclude: ['nft']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Thumbnail: Story = {
  args: {
    nft: getNftMockById('8hHFadIrrooORfTOLkBg')
  }
}
