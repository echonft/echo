// noinspection JSUnusedGlobalSymbols

import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { acceptOffer } from '@echo/storybook/mocks/accept-offer'
import { signOffer } from '@echo/storybook/mocks/sign-offer'
import { OfferDetailsAcceptSignModal as Component } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-sign-modal'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Accept/Sign',
  component: Component,
  argTypes: {
    onClose: {
      table: {
        disable: true
      }
    },
    onSuccess: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['offer', 'open', 'chainId', 'token', 'fetcher']
    }
  }
}

export default metadata

export const Sign: StoryObj<typeof Component> = {
  args: {
    offer: getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi'),
    chainId: 1,
    open: true,
    fetcher: {
      acceptOffer: acceptOffer('LyCfl6Eg7JKuD7XJ6IPi'),
      signOffer
    }
  }
}
