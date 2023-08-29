import { getNftById } from '../../../mocks/model/nft'
import { getCollectionById } from '../../../mocks/model/nft-collection'
import { getOfferById } from '../../../mocks/model/offer'
import { NftDetails as Component, NftDetailsSkeleton } from '@echo/ui'
import { NftWithCollection } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { assoc, dissoc, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Pages/NFT Details',
  component: Component,
  argTypes: {
    onMakeOffer: {
      control: false,
      action: 'make offer clicked'
    }
  },
  parameters: {
    controls: {
      exclude: ['nft', 'offers']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

const nft = getNftById('QFjMRNChUAHNswkRADXh')
const collection = getCollectionById(nft.collectionId)
const nftWithCollection = pipe(
  dissoc('collectionId'),
  dissoc('collectionName'),
  assoc('collection', collection)
)(nft) as NftWithCollection
const offer = getOfferById('LyCfl6Eg7JKuD7XJ6IPi')
export const Default: Story = {
  args: {
    nft: nftWithCollection,
    offers: [
      assoc('expiresAt', dayjs().add(1, 'hour'), offer),
      assoc('expiresAt', dayjs().add(6, 'hour'), offer),
      assoc('expiresAt', dayjs().add(1, 'day'), offer),
      assoc('expiresAt', dayjs().add(40, 'hour'), offer)
    ]
  }
}

export const NoOffers: Story = {
  args: {
    nft: nftWithCollection,
    offers: []
  }
}

export const Skeleton: Story = {
  render: () => <NftDetailsSkeleton />
}
