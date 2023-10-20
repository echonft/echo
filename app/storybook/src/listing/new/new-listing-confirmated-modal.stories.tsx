import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { NewListingConfirmedModal as Component } from '@echo/ui/components/listing/new/new-listing-confirmed-modal'
import { type Meta, type StoryObj } from '@storybook/react'
import { head } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Confirmed Modal',
  component: Component,
  argTypes: {
    onClose: {
      control: false,
      action: 'close'
    }
  },
  parameters: {
    controls: {
      exclude: ['collectionSlug', 'listingId', 'show', 'onClose']
    }
  }
}

export default metadata

const { id, targets } = getListingMockById('jUzMtPGKM62mMhEcmbN4')
const target = head(targets)

type Story = StoryObj<typeof Component>

export const ConfirmedModal: Story = {
  args: {
    collectionSlug: target.collection.slug,
    listingId: id,
    show: true
  }
}
