// noinspection JSUnusedGlobalSymbols

import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { ListingRow as Component } from '@echo/ui/components/listing/row/listing-row'
import { type Meta, type StoryObj } from '@storybook/react'

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

export const Row: Story = {
  args: {
    listing: getListingMockById('jUzMtPGKM62mMhEcmbN4')
  }
}
