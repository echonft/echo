import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { NewListingConfirmedModal as Component } from '@echo/ui/components/listing/new/new-listing-confirmed-modal'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Confirmed Modal',
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

export const ConfirmedModal: Story = {
  args: {
    listing: getListingMockById('jUzMtPGKM62mMhEcmbN4'),
    open: true
  }
}
