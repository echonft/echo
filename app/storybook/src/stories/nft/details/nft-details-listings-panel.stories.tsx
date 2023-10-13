import { NftDetailsListingsPanel as Component } from '@echo/ui/components/nft/details/nft-details-listings-panel'
import { getListingById } from '@mocks/model/listing'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { assoc } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Nft/Details/Listings Panel',
  component: Component,
  parameters: {
    controls: {
      exclude: 'listings'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

const listing = getListingById('jUzMtPGKM62mMhEcmbN4')
export const Default: Story = {
  args: {
    listings: [
      assoc('expiresAt', dayjs().add(1, 'hour').unix(), listing),
      assoc('expiresAt', dayjs().add(6, 'hour').unix(), listing),
      assoc('expiresAt', dayjs().add(1, 'day').unix(), listing),
      assoc('expiresAt', dayjs().add(40, 'hour').unix(), listing)
    ]
  }
}

export const Empty: Story = {
  args: {
    listings: []
  }
}
