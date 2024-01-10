import { getListingMock } from '@echo/model-mocks/listing/get-listing-mock'
import { NewListingConfirmationModal as Component } from '@echo/ui/components/listing/new/new-listing-confirmation-modal'
import { type Meta, type StoryObj } from '@storybook/react'
import { head } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Confirmation Modal',
  component: Component,
  argTypes: {
    onClose: {
      table: {
        disable: true
      }
    },
    onConfirm: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['target', 'items', 'open']
    }
  }
}

export default metadata

const { targets, items } = getListingMock()
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
    onClose: undefined,
    onConfirm: undefined
  }
}
