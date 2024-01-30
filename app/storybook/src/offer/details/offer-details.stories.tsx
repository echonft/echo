// noinspection JSUnusedGlobalSymbols

import { OFFER_STATE_EXPIRED, OFFER_STATE_OPEN, OFFER_STATES } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { acceptOffer } from '@echo/storybook/mocks/accept-offer'
import { approveErc721Contract } from '@echo/storybook/mocks/approve-erc-721-contract'
import { cancelOffer } from '@echo/storybook/mocks/cancel-offer'
import { chain } from '@echo/storybook/mocks/chain'
import { executeSwap } from '@echo/storybook/mocks/execute-swap'
import { expiredDate } from '@echo/storybook/mocks/expired-date'
import { getErc721ContractApproval } from '@echo/storybook/mocks/get-erc-721-contract-approval '
import { getOfferSignature } from '@echo/storybook/mocks/get-offer-signature'
import { notExpiredDate } from '@echo/storybook/mocks/not-expired-date'
import { rejectOffer } from '@echo/storybook/mocks/reject-offer'
import { signOffer } from '@echo/storybook/mocks/sign-offer'
import { OfferDetails as Component } from '@echo/ui/components/offer/details/offer-details'
import { type Meta, type StoryObj } from '@storybook/react'
import { assoc, ifElse, pipe, propEq } from 'ramda'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<Record<'state', OfferState> & Record<'isCreator', boolean>>
const metadata: Meta<ComponentType> = {
  title: 'Offer/Details',
  args: {
    state: OFFER_STATE_OPEN,
    isCreator: true
  },
  argTypes: {
    state: {
      defaultValue: OFFER_STATE_OPEN,
      options: OFFER_STATES,
      control: { type: 'radio' }
    },
    isCreator: {
      defaultValue: true,
      control: 'boolean'
    }
  },
  parameters: {
    controls: {
      exclude: ['offer', 'token', 'fetcher', 'provider']
    }
  }
}

export default metadata

export const Default: StoryObj<ComponentType> = {
  render: ({ state, isCreator }) => {
    const renderedOffer = pipe<[string], Offer, Offer, Offer>(
      getOfferMockById,
      assoc('state', state),
      ifElse(
        propEq(OFFER_STATE_EXPIRED, 'state'),
        assoc('expiresAt', expiredDate()),
        assoc('expiresAt', notExpiredDate())
      ) as unknown as (offer: Offer) => Offer
    )('LyCfl6Eg7JKuD7XJ6IPi')
    return (
      <Component
        offer={renderedOffer}
        isCreator={isCreator}
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
