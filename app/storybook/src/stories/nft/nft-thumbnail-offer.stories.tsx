import { nfts, NftThumbnailOffer as Component, NftThumbnailOfferSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Thumbnail/Offer',
  component: Component,
  argTypes: {
    onRemove: {
      control: false,
      action: 'removable'
    },
    size: {
      options: ['Medium', 'Large'],
      control: { type: 'radio' }
    }
  },
  parameters: {
    controls: {
      exclude: ['nft']
    }
  }
}

export default metadata

const mockNft = nfts['QFjMRNChUAHNswkRADXh']!
type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    nft: mockNft,
    discordUsername: undefined
  }
}

export const NotRemovable: Story = {
  args: {
    nft: mockNft,
    onRemove: undefined
  }
}

export const UserDisplayed: Story = {
  args: {
    nft: mockNft,
    onRemove: undefined,
    discordUsername: 'johnnycage#0890'
  }
}

export const Skeleton: Story = {
  render: ({ size }) => <NftThumbnailOfferSkeleton size={size} />
}
