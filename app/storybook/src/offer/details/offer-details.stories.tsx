// noinspection JSUnusedGlobalSymbols

import { OFFER_ROLE_RECEIVER, OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import {
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATES,
  READ_ONLY_OFFER_STATES
} from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferRole } from '@echo/model/types/offer-role'
import type { OfferState } from '@echo/model/types/offer-state'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { OfferDetails as Component } from '@echo/ui/components/offer/details/offer-details'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, includes, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

type Role = 'Sender' | 'Receiver' | 'None'
type ComponentType = FunctionComponent<{
  state: OfferState
  role: Role
}>
const metadata: Meta<ComponentType> = {
  title: 'Offer/Details',
  args: {
    state: OFFER_STATE_OPEN,
    role: 'Sender'
  },
  argTypes: {
    state: {
      defaultValue: OFFER_STATE_OPEN,
      options: OFFER_STATES,
      control: { type: 'select' }
    },
    role: {
      defaultValue: 'Sender',
      options: ['Sender', 'Receiver', 'None'],
      control: { type: 'radio' }
    }
  }
}

export default metadata

export const Details: StoryObj<ComponentType> = {
  render: ({ state, role }) => {
    function setExpirationAndReadOnly(offer: Offer): Offer {
      if (offer.state === OFFER_STATE_EXPIRED) {
        return pipe<[Offer], Offer, Offer>(assoc('expiresAt', expiredDate()), assoc('readOnly', true))(offer)
      }
      if (includes(offer.state, READ_ONLY_OFFER_STATES)) {
        return pipe<[Offer], Offer, Offer>(assoc('expiresAt', notExpiredDate()), assoc('readOnly', true))(offer)
      }
      return pipe<[Offer], Offer, Offer>(assoc('expiresAt', notExpiredDate()), assoc('readOnly', false))(offer)
    }

    function setRole(offer: Offer): OfferWithRole {
      if (role === 'Sender') {
        return assoc<OfferRole, Offer, 'role'>('role', OFFER_ROLE_SENDER, offer)
      }
      if (role === 'Receiver') {
        return assoc<OfferRole, Offer, 'role'>('role', OFFER_ROLE_RECEIVER, offer)
      }
      return assoc('role', undefined, offer)
    }

    const renderedOffer = pipe<[string], Offer, Offer, Offer, OfferWithRole>(
      getOfferMockById,
      assoc('state', state),
      setExpirationAndReadOnly,
      setRole
    )(offerMockToJohnnycageId())
    return <Component offer={renderedOffer} />
  }
}
