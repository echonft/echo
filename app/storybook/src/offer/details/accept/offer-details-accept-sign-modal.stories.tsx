// noinspection JSUnusedGlobalSymbols

import { OFFER_ROLE_RECEIVER } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { acceptOffer } from '@echo/storybook/mocks/accept-offer'
import { signOffer } from '@echo/storybook/mocks/sign-offer'
import { OfferDetailsAcceptSignModal as Component } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-sign-modal'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Accept/Sign',
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
    offer: pipe<[string], Offer, OfferWithRole>(
      getOfferMockById,
      assoc('role', OFFER_ROLE_RECEIVER)
    )('LyCfl6Eg7JKuD7XJ6IPi'),
    chainId: 1,
    open: true,
    fetcher: {
      acceptOffer: acceptOffer('LyCfl6Eg7JKuD7XJ6IPi'),
      signOffer
    }
  }
}
