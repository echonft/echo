import { getAllNfts } from '../../mocks/model/nft'
import { CollectionNftsAndFiltersContainer as Component, CollectionNftsSkeleton } from '@echo/ui'
import { getTraitsForNfts } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Collection/NFTs and Filters Container',
  component: Component,
  argTypes: {
    onMakeOfferForNft: {
      control: false,
      action: 'make offer for an NFT clicked'
    }
  },
  parameters: {
    controls: {
      exclude: ['collectionSlug', 'nfts', 'traits', 'onMakeOfferForNft']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>
const nfts = getAllNfts()
const traits = getTraitsForNfts(nfts)

export const Default: Story = {
  args: {
    nfts,
    traits,
    collectionSlug: '#'
  }
}

export const Skeleton: Story = {
  render: () => <CollectionNftsSkeleton />
}
