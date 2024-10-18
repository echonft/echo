// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Offer } from '@echo/model/types/offer/offer'
import { OfferDetailsSwapModalSwitch as Component } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-modal-switch'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Details/Modal/Swap',
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
  component: Component,
  parameters: {
    controls: {
      exclude: ['offer', 'open', 'token']
    }
  }
}

export default metadata

export const Swap: StoryObj<typeof Component> = {
  args: {
    offer: pipe<[string], Offer, OfferWithRole>(
      getOfferMockById,
      assoc<OfferRole, 'role'>('role', OfferRole.Sender)
    )(offerMockToJohnnycageId()),
    open: true
  }
}
