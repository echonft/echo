import { getListingById } from '../../mocks/model/listing'
import { ListingRow as Component, ListingRowSkeleton } from '@echo/ui'
import { Listing } from '@echo/ui-model'
import type { Meta, StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

const listing = getListingById('jUzMtPGKM62mMhEcmbN4')
const notExpiredListing = pipe(assoc('expiresAt', dayjs().add(2, 'd')), assoc('expired', false))(listing) as Listing
const expiredListing = pipe(assoc('expiresAt', dayjs().subtract(1, 'w')), assoc('expired', true))(listing) as Listing
const metadata: Meta<typeof Component> = {
  title: 'Listing/Row',
  component: Component,
  parameters: {
    controls: {
      exclude: 'listing'
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Expired: Story = {
  args: {
    listing: expiredListing
  }
}

export const NotExpired: Story = {
  args: {
    listing: notExpiredListing
  }
}

export const Skeleton: Story = {
  render: () => <ListingRowSkeleton />
}
