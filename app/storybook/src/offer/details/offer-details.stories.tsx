// noinspection JSUnusedGlobalSymbols

import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { CancelOfferArgs } from '@echo/api/types/fetchers/cancel-offer-args'
import type { GetOfferSignatureArgs } from '@echo/api/types/fetchers/get-offer-signature-args'
import type { RejectOfferArgs } from '@echo/api/types/fetchers/reject-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED,
  OFFER_STATES
} from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { OfferDetails as Component } from '@echo/ui/components/offer/details/offer-details'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ApproveErc721ContractArgs } from '@echo/web3/types/approve-erc-721-contract-args'
import type { ExecuteSwapArgs } from '@echo/web3/types/execute-swap-args'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'
import type { SignOfferArgs } from '@echo/web3/types/sign-offer-args'
import { type Meta, type StoryObj } from '@storybook/react'
import dayjs from 'dayjs'
import { assoc, equals, ifElse, pipe, prop } from 'ramda'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<Record<'state', OfferState> & Record<'isCreator', boolean>>
const DEFAULT_STATE: OfferState = OFFER_STATE_OPEN
const DEFAULT_IS_CREATOR = true
const EXPIRED_DATE = dayjs().subtract(2, 'd').unix()
const NOT_EXPIRED_DATE = dayjs().add(2, 'd').unix()
const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
function acceptOffer(_args: AcceptOfferArgs): Promise<OfferResponse> {
  return delayPromise(Promise.resolve({ offer: assoc('state', OFFER_STATE_ACCEPTED, offer) }), 1200)
}
function signOffer(_args: SignOfferArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
function getErc721ContractApproval(_args: GetErc721ContractApprovalArgs): Promise<boolean> {
  return delayPromise(Promise.resolve(false), 1200)
}
function approveErc721Contract(_args: ApproveErc721ContractArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
function rejectOffer(_args: RejectOfferArgs) {
  return delayPromise(Promise.resolve({ offer: assoc('state', OFFER_STATE_REJECTED, offer) }), 800)
}
function cancelOffer(_args: CancelOfferArgs) {
  return delayPromise(Promise.resolve({ offer: assoc('state', OFFER_STATE_CANCELLED, offer) }), 800)
}
function getOfferSignature(_args: GetOfferSignatureArgs): Promise<OfferSignatureResponse> {
  return delayPromise(Promise.resolve({ signature: '0xwhatever' }), 1200)
}
function executeSwap(_args: ExecuteSwapArgs): Promise<HexString> {
  return delayPromise(Promise.resolve('0xwhatever'), 1200)
}
function chain() {
  return 1
}
const metadata: Meta<ComponentType> = {
  title: 'Offer/Details',
  argTypes: {
    state: {
      defaultValue: DEFAULT_STATE,
      options: OFFER_STATES,
      control: { type: 'radio' }
    },
    isCreator: {
      defaultValue: DEFAULT_IS_CREATOR,
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

type Story = StoryObj<ComponentType>

export const Default: Story = {
  render: ({ state, isCreator }) => {
    const renderedOffer = pipe<[Offer], Offer, Offer>(
      assoc('state', state),
      ifElse<[Offer], Offer, Offer>(
        pipe(prop('state'), equals(OFFER_STATE_EXPIRED)),
        assoc('expiresAt', EXPIRED_DATE),
        assoc('expiresAt', NOT_EXPIRED_DATE)
      )
    )(offer)
    return (
      <Component
        offer={renderedOffer}
        isCreator={isCreator}
        fetcher={{
          approveErc721Contract,
          getErc721ContractApproval,
          acceptOffer,
          cancelOffer,
          executeSwap,
          getOfferSignature,
          rejectOffer,
          signOffer
        }}
        provider={{
          chain
        }}
      />
    )
  },
  args: {
    state: DEFAULT_STATE,
    isCreator: DEFAULT_IS_CREATOR
  }
}
