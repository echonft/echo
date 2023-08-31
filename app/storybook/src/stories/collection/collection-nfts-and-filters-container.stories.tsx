import { getAllNfts } from '../../mocks/model/nft'
import { CollectionNftsAndFiltersContainer as Component, CollectionNftsSkeleton } from '@echo/ui'
import { getTraitsForNfts } from '@echo/ui-model'
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
const nfts = getAllNfts()
const traits = getTraitsForNfts(nfts)

export const Default: Story = {
  render: () => <Component nfts={nfts} traits={traits} />
}

export const FetchingNewNFTS: Story = {
  render: () => <Component nfts={nfts} traits={traits} isFetchingNfts={true} />
}

export const Skeleton: Story = {
  render: () => <CollectionNftsSkeleton />
}
