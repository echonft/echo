// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { OfferState } from '@echo/model/constants/offer-state'
import { shouldLockOffer } from '@echo/model/helpers/offer/should-lock-offer'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Offer } from '@echo/model/types/offer/offer'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { OfferDetails as Component, type OfferDetailsProps } from '@echo/ui/components/offer/details/offer-details'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { append, assoc, pipe, values } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props extends Pick<OfferDetailsProps, 'onUpdate'> {
  state: OfferState
  role: OfferRole | 'none'
}

type ComponentType = FunctionComponent<Props>

const metadata: Meta<ComponentType> = {
  title: 'Offer/Details',
  args: {
    state: OfferState.Open,
    role: OfferRole.Sender
  },
  argTypes: {
    state: {
      options: values(OfferState),
      control: { type: 'select' }
    },
    role: {
      options: pipe(values, append('none'))(OfferRole),
      control: { type: 'radio' }
    },
    onUpdate: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['onUpdate']
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
      if (role === OfferRole.Sender) {
        return assoc('role', OfferRole.Sender, offer)
      }
      if (role === OfferRole.Receiver) {
        return assoc('role', OfferRole.Receiver, offer)
      }
      return assoc('role', undefined, offer)
    }

    const offer = pipe(offerMockToJohnnycageId, getOfferMockById)()
    const renderedOffer = pipe<[Offer], Offer, Offer, OfferWithRole>(
      assoc('state', state),
      setExpirationAndLocked,
      setRole
    )(offer)
    return <Component offer={renderedOffer} />
  }
}
