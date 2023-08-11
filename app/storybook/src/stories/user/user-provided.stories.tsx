import { nfts, users } from '@echo/model'
import { getCollectionFiltersForNfts, UserProvided as Component, UserSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/User/Provided',
  component: Component,
  argTypes: {
    onFilterSelectionUpdate: {
      control: false,
      action: 'filter selection updated'
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
const user = users['6rECUMhevHfxABZ1VNOm']!
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
  render: () => <Component user={user} nfts={mockNfts} filters={filters} />
}

export const FetchingNewNFTS: Story = {
  render: () => <Component user={user} nfts={mockNfts} filters={filters} isFetchingNfts={true} />
}

export const Skeleton: Story = {
  render: () => <UserSkeleton />
}
