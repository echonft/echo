import { NewListingConfirmationModal as Component } from '@echo/ui/components/listing/new/new-listing-confirmation-modal'
import { getListingById } from '@mocks/model/listing'
import type { Meta, StoryObj } from '@storybook/react'
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
      exclude: ['target', 'items', 'show', 'confirming', 'onClose', 'onConfirm']
    }
  }
}

export default metadata

const { targets, items } = getListingById('jUzMtPGKM62mMhEcmbN4')
const target = head(targets)

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    target,
    items,
    show: true
  }
}

export const Confirming: Story = {
  args: {
    target,
    items,
    show: true,
    confirming: true
  }
}
