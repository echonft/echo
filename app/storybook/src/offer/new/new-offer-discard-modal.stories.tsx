// noinspection JSUnusedGlobalSymbols

import { NewOfferDiscardModal as Component } from '@echo/ui/components/offer/new/new-offer-discard-modal'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New/Discard Modal',
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

export const DiscardModal: StoryObj<typeof Component> = {
  args: {
    open: true
  }
}
