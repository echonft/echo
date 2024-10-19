// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { OfferState } from '@echo/model/constants/offer-state'
import { shouldLockOffer } from '@echo/model/helpers/offer/should-lock-offer'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Offer } from '@echo/model/types/offer/offer'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { OfferDetails as Component } from '@echo/ui/components/offer/details/offer-details'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, pipe, values } from 'ramda'
import { type FunctionComponent } from 'react'

type Role = 'Sender' | 'Receiver' | 'None'
type ComponentType = FunctionComponent<{
  state: OfferState
  role: Role
}>
const metadata: Meta<ComponentType> = {
  title: 'Offer/Details',
  args: {
    state: OfferState.Open,
    role: 'Sender'
  },
  argTypes: {
    state: {
      defaultValue: OfferState.Open,
      options: values(OfferState),
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
    function setExpirationAndLocked(offer: Offer): Offer {
      if (offer.state === OfferState.Expired) {
        return pipe<[Offer], Offer, Offer>(assoc('expiresAt', expiredDate()), assoc('locked', true))(offer)
      }
      if (shouldLockOffer(offer.state)) {
        return pipe<[Offer], Offer, Offer>(assoc('expiresAt', notExpiredDate()), assoc('locked', true))(offer)
      }
      return pipe<[Offer], Offer, Offer>(assoc('expiresAt', notExpiredDate()), assoc('locked', false))(offer)
    }

    function setRole(offer: Offer): OfferWithRole {
      if (role === 'Sender') {
        return assoc<OfferRole, Offer, 'role'>('role', OfferRole.Sender, offer)
      }
      if (role === 'Receiver') {
        return assoc<OfferRole, Offer, 'role'>('role', OfferRole.Receiver, offer)
      }
      return assoc('role', undefined, offer)
    }

    const renderedOffer = pipe<[string], Offer, Offer, Offer, OfferWithRole>(
      getOfferMockById,
      assoc('state', state),
      setExpirationAndLocked,
      setRole
    )(offerMockToJohnnycageId())
    return <Component offer={renderedOffer} />
  }
}
