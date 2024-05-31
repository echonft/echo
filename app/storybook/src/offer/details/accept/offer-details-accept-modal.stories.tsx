// noinspection JSUnusedGlobalSymbols

import { OFFER_ROLE_RECEIVER } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer'
import type { OfferRole } from '@echo/model/types/offer-role'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model-mocks/offer/offer-mock'
import { OfferDetailsAcceptModalSwitch as Component } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-modal-switch'
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
      assoc<OfferRole, 'role'>('role', OFFER_ROLE_RECEIVER)
    )(offerMockToJohnnycageId()),
    open: true
  }
}
