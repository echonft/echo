import { NewListingDiscardModal as Component } from '@echo/ui/components/listing/new/new-listing-discard-modal'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/New/Discard Modal',
  component: Component,
  argTypes: {
    onClose: {
      table: {
        disable: true
      }
    },
    onDiscard: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['onClose', 'onDiscard', 'open']
    }
  }
}

export default metadata

type Story = StoryObj<typeof Component>

export const DiscardModal: Story = {
  args: {
    open: true
  }
}
