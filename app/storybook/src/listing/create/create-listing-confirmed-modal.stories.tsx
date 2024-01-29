// noinspection JSUnusedGlobalSymbols

import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { CreateListingConfirmedModal as Component } from '@echo/ui/components/listing/create/confirmed/create-listing-confirmed-modal'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Creation/Confirmed',
  component: Component,
  argTypes: {
    onClose: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['listing', 'open']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const Confirmed: Story = {
  args: {
    listing: getListingMockById('jUzMtPGKM62mMhEcmbN4'),
    open: true
  }
}
