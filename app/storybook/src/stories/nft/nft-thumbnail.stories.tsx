import { NftThumbnail as Component } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { getNftById } from '@mocks/model/nft'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Thumbnail',
  component: Component,
  argTypes: {
    hideOwner: {
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
    nft: getNftById('8hHFadIrrooORfTOLkBg')
  }
}
