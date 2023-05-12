import { nftPictureUrl } from '../constants'
import { mockUser } from '@echo/model'
import { NftThumbnailSelectable as Component, SelectionManager } from '@echo/ui'
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
    pictureUrl: nftPictureUrl,
    owner: mockUser.discordUsername,
    name: 'Sun Flyer',
    tokenId: BigInt(10000)
  }
}

export const Flagged: Story = {
  args: {
    pictureUrl: nftPictureUrl,
    owner: mockUser.discordUsername,
    name: 'Sun Flyer',
    tokenId: BigInt(10000),
    flagged: true
  }
}

export const Selected: Story = {
  args: {
    pictureUrl: nftPictureUrl,
    owner: mockUser.discordUsername,
    name: 'Sun Flyer',
    tokenId: BigInt(10000),
    selected: true
  }
}

export const Managed: Story = {
  render: () => (
    <SelectionManager>
      <Component
        pictureUrl={nftPictureUrl}
        owner={mockUser.discordUsername}
        name={'Sun Flyer'}
        tokenId={BigInt(10000)}
      />
    </SelectionManager>
  )
}
