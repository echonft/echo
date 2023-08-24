import { getAllNfts } from '../../mocks/model/nft'
import { getCollectionById } from '../../mocks/model/nft-collection'
import { CollectionProvided as Component, CollectionSkeleton } from '@echo/ui'
import { getTraitsForNfts } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Pages/Collection/Provided',
  component: Component,
  argTypes: {
    onTraitSelectionUpdate: {
      control: false,
      action: 'traits selection updated'
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
const collection = getCollectionById('Rc8pLQXxgyQGIRL0fr13')
const nfts = getAllNfts()
const traits = getTraitsForNfts(nfts)

export const Default: Story = {
  render: () => <Component collection={collection} nfts={nfts} traits={traits} />
}

export const FetchingNewNFTS: Story = {
  render: () => <Component collection={collection} nfts={nfts} traits={traits} isFetchingNfts={true} />
}

export const Skeleton: Story = {
  render: () => <CollectionSkeleton />
}
