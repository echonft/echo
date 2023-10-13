import { NewListingConfirmedModal as Component } from '@echo/ui/components/listing/new/new-listing-confirmed-modal'
import { getListingById } from '@mocks/model/listing'
import type { Meta, StoryObj } from '@storybook/react'
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

const { id, targets } = getListingById('jUzMtPGKM62mMhEcmbN4')
const target = head(targets)

type Story = StoryObj<typeof Component>

export const ConfirmedModal: Story = {
  args: {
    collectionSlug: target.collection.slug,
    listingId: id,
    show: true
  }
}
