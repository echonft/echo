import { getAllNfts } from '../../mocks/model/nft'
import { UserNftsAndFiltersContainer as Component, UserNftsAndFiltersContainerSkeleton } from '@echo/ui'
import { getCollectionFiltersForNfts } from '@echo/ui-model'
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
const nfts = getAllNfts()
const filters = getCollectionFiltersForNfts(nfts)

export const Default: Story = {
  render: () => <Component nfts={nfts} filters={filters} />
}

export const FetchingNewNFTS: Story = {
  render: () => <Component nfts={nfts} filters={filters} isFetchingNfts={true} />
}

export const Skeleton: Story = {
  render: () => <UserNftsAndFiltersContainerSkeleton />
}
