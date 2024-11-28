// noinspection JSUnusedGlobalSymbols

import { OfferRole } from '@echo/model/constants/offer-role'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import type { Offer } from '@echo/model/types/offer'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { OfferDetails as Component, type OfferDetailsProps } from '@echo/ui/components/offer/details/offer-details'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type Meta, type StoryObj } from '@storybook/react'
import { append, assoc, pipe, values } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props extends Omit<OfferDetailsProps, 'offer' | 'onUpdate'> {
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
    onClose: {
      table: {
        disable: true
      }
    },
    onRedeem: {
      table: {
        disable: true
      }
    },
    onSwap: {
      table: {
        disable: true
      }
    }
  }
}

export default metadata

export const Details: StoryObj<ComponentType> = {
  render: ({ state, role, onClose, onRedeem, onSwap }) => {
    const [offer, setOffer] = useState<OfferWithRole>(assoc('role', undefined, offerMockToJohnnycage))

    function setExpirationAndLocked(offer: OfferWithRole): OfferWithRole {
      if (offer.state === OfferState.Expired) {
        return pipe(assoc('expiresAt', expiredDate()), assoc('locked', true))(offer)
      }
      if (offer.state !== OfferState.Open) {
        return pipe(assoc('expiresAt', notExpiredDate()), assoc('locked', true))(offer)
      }
      return pipe(assoc('expiresAt', notExpiredDate()), assoc('locked', false))(offer)
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

    useEffect(() => {
      setOffer(pipe(assoc('state', state), setExpirationAndLocked, setRole))
    }, [state, role])

    return (
      <Component
        offer={offer}
        onClose={onClose}
        onRedeem={onRedeem}
        onSwap={onSwap}
        onUpdate={(offer) => {
          setOffer(setRole(offer))
        }}
      />
    )
  }
}
