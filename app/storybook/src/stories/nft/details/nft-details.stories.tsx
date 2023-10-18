import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { NftDetails as Component } from '@echo/ui/components/nft/details/nft-details'
import { type Meta, type StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { assoc } from 'ramda'

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

const nft = getNftMockById('QFjMRNChUAHNswkRADXh')
const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
export const Default: Story = {
  args: {
    nft,
    listings: [
      assoc('expiresAt', dayjs().add(1, 'hour').unix(), listing),
      assoc('expiresAt', dayjs().add(6, 'hour').unix(), listing),
      assoc('expiresAt', dayjs().add(1, 'day').unix(), listing),
      assoc('expiresAt', dayjs().add(40, 'hour').unix(), listing)
    ]
  }
}

export const NoOffers: Story = {
  args: {
    nft,
    listings: []
  }
}
