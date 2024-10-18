// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Offer } from '@echo/model/types/offer/offer'
import { OfferDetailsSwapModal as Component } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-modal'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{ onClose?: VoidFunction; onSuccess?: VoidFunction }>
const metadata: Meta<ComponentType> = {
  title: 'Offer/Details/Modal/Swap/Execute',
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
  }
}

export default metadata

export const Execute: StoryObj<ComponentType> = {
  render: ({ onClose, onSuccess }) => (
    <Component
      offer={pipe<[string], Offer, OfferWithRole>(
        getOfferMockById,
        assoc<OfferRole, 'role'>('role', OfferRole.Sender)
      )(offerMockToJohnnycageId())}
      open={true}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  )
}
