// noinspection JSUnusedGlobalSymbols

import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { NewOfferConfirmationModal as Component } from '@echo/ui/components/offer/new/new-offer-confirmation-modal'
import { type Meta, type StoryObj } from '@storybook/react'
import { pipe, prop } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/New/Confirmation Modal',
  component: Component,
  args: {
    receiver: pipe(getOfferMockById, prop('receiver'))('LyCfl6Eg7JKuD7XJ6IPi'),
    open: true
  },
  argTypes: {
    onClose: {
      table: {
        disable: true
      }
    },
    onContinue: {
      table: {
        disable: true
      }
    },
    onComplete: {
      table: {
        disable: true
      }
    },
    onClear: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['receiverItems', 'receiver', 'senderItems', 'open']
    }
  }
}

export default metadata

export const ItemsNotSelected: StoryObj<typeof Component> = {
  args: {
    receiverItems: pipe(getOfferMockById, prop('receiverItems'))('LyCfl6Eg7JKuD7XJ6IPi'),
    senderItems: undefined
  }
}

export const ItemsSelected: StoryObj<typeof Component> = {
  args: {
    receiverItems: pipe(getOfferMockById, prop('receiverItems'))('LyCfl6Eg7JKuD7XJ6IPi'),
    senderItems: pipe(getOfferMockById, prop('senderItems'))('LyCfl6Eg7JKuD7XJ6IPi')
  }
}

export const Confirming: StoryObj<typeof Component> = {
  args: {
    receiverItems: pipe(getOfferMockById, prop('receiverItems'))('LyCfl6Eg7JKuD7XJ6IPi'),
    senderItems: pipe(getOfferMockById, prop('senderItems'))('LyCfl6Eg7JKuD7XJ6IPi'),
    onClear: undefined,
    onContinue: undefined,
    onComplete: undefined,
    onClose: undefined
  }
}
