// noinspection JSUnusedGlobalSymbols

import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { NewOfferConfirmedModal as Component } from '@echo/ui/components/offer/new/new-offer-confirmed-modal'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New/Confirmed Modal',
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
      exclude: ['offerId', 'open']
    }
  }
}

export default metadata

export const ConfirmedModal: StoryObj<typeof Component> = {
  args: {
    offer: getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'),
    open: true
  }
}
