import { getTraitsForNfts, nftCollections, nfts } from '@echo/model'
import { Collection as Component, CollectionSkeleton } from '@echo/ui'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Collection',
  component: Component,
  argTypes: {
    onTraitSelectionChanged: {
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
const mockNftCollection = nftCollections['Rc8pLQXxgyQGIRL0fr13']!
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
  render: () => <Component collection={mockNftCollection} nfts={mockNfts} traits={traits} />
}

export const FetchingNewNFTS: Story = {
  render: () => <Component collection={mockNftCollection} nfts={mockNfts} traits={traits} isFetchingNfts={true} />
}

export const Skeleton: Story = {
  render: () => <CollectionSkeleton />
}
