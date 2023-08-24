import { getAllNfts } from '../../mocks/model/nft'
import { getUserById } from '../../mocks/model/user'
import { UserProvided as Component, UserSkeleton } from '@echo/ui'
import { getCollectionFiltersForNfts } from '@echo/ui-model'
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
const user = getUserById('6rECUMhevHfxABZ1VNOm')
const nfts = getAllNfts()
const filters = getCollectionFiltersForNfts(nfts)

export const Default: Story = {
  render: () => <Component user={user} nfts={nfts} filters={filters} />
}

export const FetchingNewNFTS: Story = {
  render: () => <Component user={user} nfts={nfts} filters={filters} isFetchingNfts={true} />
}

export const Skeleton: Story = {
  render: () => <UserSkeleton />
}
