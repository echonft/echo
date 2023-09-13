import { getListingById } from '../../../mocks/model/listing'
import { NftDetailsListingsPanel as Component } from '@echo/ui/components/nft/details/nft-details-listings-panel'
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
      assoc('expiresAt', dayjs().add(1, 'hour'), listing),
      assoc('expiresAt', dayjs().add(6, 'hour'), listing),
      assoc('expiresAt', dayjs().add(1, 'day'), listing),
      assoc('expiresAt', dayjs().add(40, 'hour'), listing)
    ]
  }
}

export const Empty: Story = {
  args: {
    listings: []
  }
}
