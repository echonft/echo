// noinspection JSUnusedGlobalSymbols

import { CreateOfferDiscardModal as Component } from '@echo/ui/components/offer/create/discard/create-offer-discard-modal'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Creation/Discard',
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
      exclude: ['open']
    }
  }
}

export default metadata

export const Discard: StoryObj<typeof Component> = {
  args: {
    open: true
  }
}
