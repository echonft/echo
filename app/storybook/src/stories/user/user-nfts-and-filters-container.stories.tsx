import { nfts } from '@echo/model'
import {
  getCollectionFiltersForNfts,
  UserNftsAndFiltersContainer as Component,
  UserNftsAndFiltersContainerSkeleton
} from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'User/NFTs and Filters Container',
  component: Component,
  argTypes: {
    onFilterSelectionUpdate: {
      control: false,
      action: 'filters selection changed'
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
const filters = getCollectionFiltersForNfts(mockNfts)

export const Default: Story = {
  render: () => <Component nfts={mockNfts} filters={filters} />
}

export const FetchingNewNFTS: Story = {
  render: () => <Component nfts={mockNfts} filters={filters} isFetchingNfts={true} />
}

export const Skeleton: Story = {
  render: () => <UserNftsAndFiltersContainerSkeleton />
}
