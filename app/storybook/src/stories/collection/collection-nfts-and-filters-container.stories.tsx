import { getTraitsForNfts, nfts } from '@echo/model'
import { CollectionNftsAndFiltersContainer as Component, CollectionNftsAndFiltersContainerSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/NFTs and Filters Container',
  component: Component,
  argTypes: {
    onTraitSelectionUpdate: {
      control: false,
      action: 'traits selection changed'
    },
    onMakeOfferForNft: {
      control: false,
      action: 'make offer for an NFT clicked'
    }
  },
  parameters: {
    controls: {
      exclude: 'isFetchingNfts'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const mockNft = nfts['8hHFadIrrooORfTOLkBg']!
const mockNft2 = nfts['QFjMRNChUAHNswkRADXh']!
const mockNfts = [
  mockNft,
  mockNft,
  mockNft2,
  mockNft,
  mockNft2,
  mockNft2,
  mockNft2,
  mockNft,
  mockNft,
  mockNft2,
  mockNft2
]
const traits = getTraitsForNfts(mockNfts)

export const Default: Story = {
  render: () => <Component nfts={mockNfts} traits={traits} />
}

export const FetchingNewNFTS: Story = {
  render: () => <Component nfts={mockNfts} traits={traits} isFetchingNfts={true} />
}

export const Skeleton: Story = {
  render: () => <CollectionNftsAndFiltersContainerSkeleton />
}
