// noinspection JSUnusedGlobalSymbols

import { OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer'
import type { OfferRole } from '@echo/model/types/offer-role'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'
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
        assoc<OfferRole, 'role'>('role', OFFER_ROLE_SENDER)
      )(OFFER_MOCK_TO_JOHNNYCAGE_ID)}
      open={true}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  )
}
