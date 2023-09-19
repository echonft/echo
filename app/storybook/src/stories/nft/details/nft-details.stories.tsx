import { NftDetails as Component } from '@echo/ui/components/nft/details/nft-details'
import { getListingById } from '@mocks/model/listing'
import { getNftById } from '@mocks/model/nft'
import type { Meta, StoryObj } from '@storybook/react'
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

const nft = getNftById('QFjMRNChUAHNswkRADXh')
const listing = getListingById('jUzMtPGKM62mMhEcmbN4')
export const Default: Story = {
  args: {
    nft,
    listings: [
      assoc('expiresAt', dayjs().add(1, 'hour'), listing),
      assoc('expiresAt', dayjs().add(6, 'hour'), listing),
      assoc('expiresAt', dayjs().add(1, 'day'), listing),
      assoc('expiresAt', dayjs().add(40, 'hour'), listing)
    ]
  }
}

export const NoOffers: Story = {
  args: {
    nft,
    listings: []
  }
}
