// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Offer } from '@echo/model/types/offer/offer'
import { OfferDetailsAcceptModal as Component } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-modal'
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
      exclude: ['offer', 'open']
    }
  }
}

export default metadata

export const Sign: StoryObj<typeof Component> = {
  args: {
    offer: pipe<[string], Offer, OfferWithRole>(
      getOfferMockById,
      assoc<OfferRole, 'role'>('role', OfferRole.Receiver)
    )(offerMockToJohnnycageId()),
    open: true
  }
}
