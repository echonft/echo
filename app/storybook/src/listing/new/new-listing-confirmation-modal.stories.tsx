import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { NewListingConfirmationModal as Component } from '@echo/ui/components/listing/new/new-listing-confirmation-modal'
import { type Meta, type StoryObj } from '@storybook/react'
import { head } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Confirmation Modal',
  component: Component,
  argTypes: {
    onClose: {
      control: false,
      action: 'close'
    },
    onConfirm: {
      control: false,
      action: 'confirm'
    }
  },
  parameters: {
    controls: {
      exclude: ['target', 'items', 'open', 'confirming', 'onClose', 'onConfirm']
    }
  }
}

export default metadata

const { targets, items } = getListingMockById('jUzMtPGKM62mMhEcmbN4')
const target = head(targets)

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    target,
    items,
    open: true
  }
}

export const Confirming: Story = {
  args: {
    target,
    items,
    open: true,
    confirming: true
  }
}
