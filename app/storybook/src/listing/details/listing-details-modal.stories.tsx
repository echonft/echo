// noinspection JSUnusedGlobalSymbols

import { getAuthUserMockByUsername } from '@echo/model-mocks/auth-user/auth-user-mock'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { ListingDetailsModal as Component } from '@echo/ui/components/listing/details/modal/listing-details-modal'
import { type Meta, type StoryObj } from '@storybook/react'

const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
const user = getAuthUserMockByUsername(listing.creator.username)

const metadata: Meta<typeof Component> = {
  title: 'Listing/Details/Modal',
  component: Component,
  parameters: {
    controls: {
      exclude: ['listing', 'user', 'fetcher']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    open: true,
    listing,
    user,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose: () => {},
    fetcher: { cancelListing: () => Promise.resolve({ listing }) }
  }
}
