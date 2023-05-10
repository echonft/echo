import { NftThumbnailSelectable as Component } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata = {
  title: 'Nft/Thumbnail/Selectable',
  component: Component,
  argTypes: {
    onToggleSelection: {
      control: false,
      action: 'selection toggled'
    },
    onMakeOffer: {
      control: false,
      action: 'make offer clicked'
    }
  },
  parameters: {
    controls: {
      exclude: ['pictureUrl', 'owner', 'name', 'tokenId']
    }
  }
} satisfies Meta<typeof Component>

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    pictureUrl: 'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/sunflyers-nft.png?alt=media',
    owner: 'crewNFT_',
    name: 'Sun Flyer',
    tokenId: BigInt(10000)
  }
}

export const Flagged: Story = {
  args: {
    pictureUrl: 'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/sunflyers-nft.png?alt=media',
    owner: 'crewNFT_',
    name: 'Sun Flyer',
    tokenId: BigInt(10000),
    flagged: true
  }
}

export const Selected: Story = {
  args: {
    pictureUrl: 'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/sunflyers-nft.png?alt=media',
    owner: 'crewNFT_',
    name: 'Sun Flyer',
    tokenId: BigInt(10000),
    selected: true
  }
}
