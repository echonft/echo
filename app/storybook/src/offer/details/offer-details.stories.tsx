// noinspection JSUnusedGlobalSymbols

import { OFFER_ROLE_RECEIVER, OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import {
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATES,
  READ_ONLY_OFFER_STATES
} from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { acceptOffer } from '@echo/storybook/mocks/accept-offer'
import { approveErc721Contract } from '@echo/storybook/mocks/approve-erc-721-contract'
import { cancelOffer } from '@echo/storybook/mocks/cancel-offer'
import { chain } from '@echo/storybook/mocks/chain'
import { executeSwap } from '@echo/storybook/mocks/execute-swap'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { getErc721ContractApproval } from '@echo/storybook/mocks/get-erc-721-contract-approval'
import { getOfferSignature } from '@echo/storybook/mocks/get-offer-signature'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { rejectOffer } from '@echo/storybook/mocks/reject-offer'
import { signOffer } from '@echo/storybook/mocks/sign-offer'
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
        return assoc('role', OFFER_ROLE_SENDER, offer)
      }
      if (role === 'Receiver') {
        return assoc('role', OFFER_ROLE_RECEIVER, offer)
      }
      return assoc('role', undefined, offer)
    }
    const renderedOffer = pipe<[string], Offer, Offer, Offer, OfferWithRole>(
      getOfferMockById,
      assoc('state', state),
      setExpirationAndReadOnly,
      setRole
    )('LyCfl6Eg7JKuD7XJ6IPi')
    return (
      <Component
        offer={renderedOffer}
        fetcher={{
          approveErc721Contract,
          getErc721ContractApproval: getErc721ContractApproval(false),
          acceptOffer: acceptOffer('LyCfl6Eg7JKuD7XJ6IPi'),
          cancelOffer: cancelOffer('LyCfl6Eg7JKuD7XJ6IPi'),
          executeSwap,
          getOfferSignature,
          rejectOffer: rejectOffer('LyCfl6Eg7JKuD7XJ6IPi'),
          signOffer
        }}
        provider={{
          chain: chain('connected')
        }}
      />
    )
  }
}
