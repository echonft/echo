import { mockNftCollection, mockOwnedNft, mockUser } from '@echo/model'
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
    pictureUrl: mockOwnedNft.media[0]!.gateway,
    owner: mockUser.discordUsername,
    collectionName: mockNftCollection.openSea?.collectionName,
    title: mockOwnedNft.title,
    tokenId: BigInt(10000)
  }
}

export const Flagged: Story = {
  args: {
    pictureUrl: mockOwnedNft.media[0]!.gateway,
    owner: mockUser.discordUsername,
    collectionName: mockNftCollection.openSea?.collectionName,
    title: mockOwnedNft.title,
    tokenId: BigInt(10000),
    flagged: true
  }
}

export const Selected: Story = {
  args: {
    pictureUrl: mockOwnedNft.media[0]!.gateway,
    owner: mockUser.discordUsername,
    collectionName: mockNftCollection.openSea?.collectionName,
    title: mockOwnedNft.title,
    tokenId: BigInt(10000),
    selected: true
  }
}

export const Managed: Story = {
  render: () => (
    <SelectionManager>
      <Component
        pictureUrl={mockOwnedNft.media[0]!.gateway}
        owner={mockUser.discordUsername}
        collectionName={mockNftCollection.openSea!.collectionName!}
        title={mockOwnedNft.title}
        tokenId={BigInt(10000)}
      />
    </SelectionManager>
  )
}
