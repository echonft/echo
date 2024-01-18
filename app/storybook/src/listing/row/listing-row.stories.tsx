// noinspection JSUnusedGlobalSymbols

import { type Listing } from '@echo/model/types/listing'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { ListingRow as Component } from '@echo/ui/components/listing/row/listing-row'
import { type Meta, type StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { assoc, pipe } from 'ramda'

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

const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
const notExpiredListing = pipe(
  assoc('expiresAt', dayjs().add(2, 'd').unix()),
  assoc('expired', false)
)(listing) as Listing
const expiredListing = pipe(
  assoc('expiresAt', dayjs().subtract(1, 'w').unix()),
  assoc('expired', true)
)(listing) as Listing

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
