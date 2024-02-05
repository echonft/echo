// noinspection JSUnusedGlobalSymbols

import { OFFER_ROLE_RECEIVER } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferDetailsAcceptModal as Component } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-modal'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Accept',
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
      exclude: ['offer', 'open', 'token']
    }
  }
}

export default metadata

export const Accept: StoryObj<typeof Component> = {
  args: {
    offer: pipe<[string], Offer, OfferWithRole>(
      getOfferMockById,
      assoc('role', OFFER_ROLE_RECEIVER)
    )('LyCfl6Eg7JKuD7XJ6IPi'),
    open: true
  }
}
