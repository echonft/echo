// noinspection JSUnusedGlobalSymbols

import { CreateListingDiscardModal as Component } from '@echo/ui/components/listing/create/discard/create-listing-discard-modal'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Creation/Discard',
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

export const Discard: StoryObj<typeof Component> = {
  args: {
    open: true
  }
}
