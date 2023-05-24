import { nftCollections, nfts, users } from '@echo/model'
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

const mockNft = nfts['QFjMRNChUAHNswkRADXh']!
const mockUser = users['oE6yUEQBPn7PZ89yMjKn']!
const mockNftCollection = nftCollections['Rc8pLQXxgyQGIRL0fr13']!
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    pictureUrl: mockNft.pictureUrl,
    owner: mockUser.discordUsername,
    collectionName: mockNftCollection.name,
    title: mockNft.name,
    tokenId: BigInt(10000)
  }
}

export const Flagged: Story = {
  args: {
    pictureUrl: mockNft.pictureUrl,
    owner: mockUser.discordUsername,
    collectionName: mockNftCollection.name,
    title: mockNft.name,
    tokenId: BigInt(10000),
    flagged: true
  }
}

export const Selected: Story = {
  args: {
    pictureUrl: mockNft.pictureUrl,
    owner: mockUser.discordUsername,
    collectionName: mockNftCollection.name,
    title: mockNft.name,
    tokenId: BigInt(10000),
    selected: true
  }
}

export const Managed: Story = {
  render: () => (
    <SelectionManager>
      <Component
        pictureUrl={mockNft.pictureUrl}
        owner={mockUser.discordUsername}
        collectionName={mockNftCollection.name}
        title={mockNft.name}
        tokenId={BigInt(10000)}
      />
    </SelectionManager>
  )
}
